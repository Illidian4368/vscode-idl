import { Logger } from '@idl/logger';
import { CleanPath } from '@idl/shared';

import { IDLListenerArgs } from './args.interface';
import { IDL_EVENT_LOOKUP, IDLEvent } from './events.interface';
import { ProcessScope } from './helpers/process-scope';
import {
  DEFAULT_IDL_EVALUATE_OPTIONS,
  DEFAULT_IDL_INFO,
  IDLBreakpoint,
  IDLCallStack,
  IDLCallStackItem,
  IDLEvaluateOptions,
  IDLInfo,
  IDLVariable,
  IRawBreakpoint,
  IStartIDLConfig,
} from './idl.interface';
import { IDLEvaluationItem } from './idl-interaction-manager.interface';
import { IDLProcess } from './idl-process.class';
import EventEmitter = require('events');

/**
 * Class that manages interacting with IDL.
 *
 * The IDL process runs behind the scenes and this adds a layer of abstraction so that we
 * can get the information we need from IDL to do things like debugging.
 */
export class IDLInteractionManager {
  /** promise queue to manage pending requests */
  private _queue: IDLEvaluationItem[] = [];

  /** Track the current item we are processing */
  private _processing: IDLEvaluationItem;

  /** Our instance of IDL */
  private idl: IDLProcess;

  constructor(log: Logger, vscodeProDir: string) {
    this.idl = new IDLProcess(log, vscodeProDir);
  }

  /**
   * Handle when we have another statement to execute
   */
  private async _next() {
    /** Return if processing or nothing to do */
    if (this._processing !== undefined || this._queue.length === 0) {
      return;
    }

    // get the next command to execute
    const info = this._queue.shift();

    // return if nothing to do
    if (info === undefined) {
      return;
    }

    // update what we are processing
    this._processing = info;

    // run in IDL and return the output
    await info.execute();

    // run again!
    this._next();
  }

  /**
   * Cancels all pending requests
   */
  cancelPending() {
    // cancel pending work
    if (this._processing !== undefined) {
      this._processing.reject('Canceled');
    }

    /** Get all pending requests */
    const pending = this._queue.splice(0, this._queue.length);

    // cancel all so we dont have floating promises
    for (let i = 0; i < pending.length; i++) {
      pending[i].reject('Canceled');
    }
  }

  /**
   * Remove all breakpoints from IDL
   */
  async clearBreakpoints(filePath?: string) {
    // get current breakpoints
    const breakpoints = await this.getBreakpoints(filePath);

    // make our breakpoint command
    const cmd = breakpoints
      .map((bp) => `breakpoint, /CLEAR, ${bp.id}`)
      .join(' & ');

    // clear all breakpoints
    await this.evaluate(cmd, {
      silent: true,
      idlInfo: false,
    });
  }

  /**
   * Returns true/false if we are processing or not
   */
  executing(): boolean {
    return this._processing !== undefined;
  }

  /**
   * Evaluate a statement in IDL
   */
  async evaluate(
    command: string,
    inOptions: IDLEvaluateOptions = {}
  ): Promise<string> {
    if (!this.isStarted()) {
      throw new Error('Start IDL before evaluating any expressions');
    }

    /**
     * Fill options with all values
     */
    const options = inOptions
      ? { ...DEFAULT_IDL_EVALUATE_OPTIONS, ...inOptions }
      : { ...DEFAULT_IDL_EVALUATE_OPTIONS };

    /** Get silent flag */
    const isSilent = options.silent !== undefined ? options.silent : false;

    /**
     * Add to our queue and wait for the results of running
     */
    const prom = new Promise<string>((res, rej) => {
      this._queue.push({
        reject: rej,
        execute: async () => {
          try {
            // set silent flag
            this.idl.silent = isSilent;

            if ('echo' in options ? options.echo : false) {
              this.idl.emit(
                IDL_EVENT_LOOKUP.OUTPUT,
                'echoThis' in options ? options.echoThis : command
              );
            }

            // resolve with output
            res(await this.idl.evaluate(command));
          } catch (err) {
            rej(err);
          }
        },
      });
    });

    // trigger processing
    this._next();

    /** Get the results from running */
    const results = await prom;

    /**
     * Check if we need to get scope information
     */
    if (options.idlInfo) {
      // make IDL silent
      this.idl.silent = true;

      // retrieve scope information
      const scopeInfo = ProcessScope(
        this.idl,
        await this.idl.evaluate(this.scopeInfoCommand(0), false)
      );

      // update if we have it or use default
      if (scopeInfo.hasInfo) {
        this.idl.idlInfo = scopeInfo;
      } else {
        this.idl.idlInfo = { ...DEFAULT_IDL_INFO };
      }

      // emit prompt
      this.idl.emit(
        IDL_EVENT_LOOKUP.PROMPT,
        this.idl.idlInfo.envi ? 'ENVI>' : 'IDL>'
      );
    }

    // reset silent flag
    this.idl.silent = false;

    // indicate that we are finished and the queue can be cleared
    this._processing = undefined;

    // trigger next processing
    this._next();

    // return results
    return results;
  }

  /**
   * Get all the breakpoints currently set in IDL
   */
  async getBreakpoints(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filepath?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lineNumber?: number
  ): Promise<IDLBreakpoint[]> {
    // get the strings for our breakpoints
    const resp = await this.evaluate('  vscode_getBreakpoints', {
      silent: true,
      idlInfo: false,
    });

    // parse the response
    const res: IRawBreakpoint[] = JSON.parse(resp);

    // initialize output breakpoints
    const bps: IDLBreakpoint[] = [];

    // map to easier-to-read-format
    for (let i = 0; i < res.length; i++) {
      const bp = res[i];
      bps.push({ id: `${bp.i}`, path: bp.f, line: bp.l });
    }

    // return our breakpoints
    return bps;
  }

  /**
   * Retrieve call stack information
   */
  getCallStack(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startFrame: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endFrame?: number
  ): IDLCallStack {
    // return if we have not started
    if (!this.idl.started) {
      return { frames: [], count: 0 };
    }

    // use the cached info from the latest call
    const info = this.idl.idlInfo;

    // initialize call stack
    const frames: IDLCallStackItem[] = [];

    // process call stack
    for (let i = 0; i < info.scope.length; i++) {
      const val = info.scope[i];
      frames.push({
        index: i,
        name: val.routine,
        file: val.file,
        line: val.line,
      });
    }

    // return our info
    return {
      frames,
      count: info.scope.length,
    };
  }

  /**
   * Gets the current call stack for IDL without using the most recent from running commands
   */
  async getCurrentStack() {
    return ProcessScope(
      this.idl,
      await this.evaluate(this.scopeInfoCommand(0), {
        silent: true,
        idlInfo: false,
      })
    ).scope;
  }

  /**
   * Reset errors by file
   */
  getErrorsByFile() {
    return this.idl.errorsByFile;
  }

  /**
   * Gets information about the current session of IDL
   */
  getIDLInfo(): IDLInfo {
    return this.idl.idlInfo;
  }

  /**
   * Get variables for current scope
   */
  async getVariables(frameId: number): Promise<IDLVariable[]> {
    // init result
    let vars: IDLVariable[] = [];

    // do we already have this scope?
    if (frameId === 0) {
      vars = this.idl.idlInfo.variables;
      // do we need to look up the scope information?
    } else {
      const scopeInfo = ProcessScope(
        this.idl,
        await this.evaluate(this.scopeInfoCommand(frameId), {
          silent: true,
          idlInfo: false,
        })
      );
      vars = scopeInfo.variables;
    }

    return vars;
  }

  /**
   * Let's you know if IDL has started or not
   */
  isStarted() {
    return this.idl.started;
  }

  /**
   * Wraps node.js event emitter with types for supported events and
   * event data.
   */
  off<T extends IDLEvent>(
    event: T,
    listener: (...args: IDLListenerArgs<T>) => void
  ): EventEmitter {
    return this.idl.off(event, listener);
  }

  /**
   * Wraps node.js event emitter with types for supported events and
   * event data.
   */
  on<T extends IDLEvent>(
    event: T,
    listener: (...args: IDLListenerArgs<T>) => void
  ): EventEmitter {
    return this.idl.on(event, listener);
  }

  /**
   * Wraps node.js event emitter with types for supported events and
   * event data.
   */
  once<T extends IDLEvent>(
    event: T,
    listener: (...args: IDLListenerArgs<T>) => void
  ): EventEmitter {
    return this.idl.once(event, listener);
  }

  /**
   * Pause the current session of IDL
   */
  pause() {
    this.idl.pause();
  }

  /**
   * Removes all listeners from the IDL process
   */
  removeAllListeners() {
    this.idl.removeAllListeners();
  }

  /**
   * Reset errors by file
   */
  resetErrorsByFile() {
    this.idl.errorsByFile = {};
  }

  /**
   * Returns a command to retrieve scope information from IDL
   */
  scopeInfoCommand(level: number) {
    return `  vscode_getScopeInfo, -${level}`;
  }

  /**
   * Add a breakpoint to IDL
   */
  async setBreakPoint(filePath: string, line: number): Promise<IDLBreakpoint> {
    // set the breakpoint
    await this.evaluate(`breakpoint, /SET, '${CleanPath(filePath)}', ${line}`, {
      silent: true,
      idlInfo: false,
    });

    // TODO: do we need to also get the breakpoint back so we know exactly where it is located?

    // return location we clicked
    return { path: filePath, line };
  }

  /**
   * Updates folder with VSCode Pro files
   */
  setVscodeProDir(dir: string) {
    this.idl.vscodeProDir = dir;
  }

  /**
   * Start IDL
   */
  start(config: IStartIDLConfig) {
    this.idl.start(config);
  }

  /**
   * Stop IDL
   */
  stop() {
    this.cancelPending();
    if (this) this.idl.stop();
  }
}
