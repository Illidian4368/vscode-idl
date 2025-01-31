import {
  DEFAULT_IDL_INFO,
  IDL_EVENT_LOOKUP,
  IDL_STOPS,
  IDLCallStackItem,
  IDLEvent,
  IDLListenerArgs,
  IStartIDLConfig,
  REGEX_NEW_LINE_COMPRESS,
  REGEX_STOP_DETECTION,
  REGEX_STOP_DETECTION_BASIC,
  StopReason,
} from '@idl/idl/shared';
import { Logger } from '@idl/logger';
import { IDL_TRANSLATION } from '@idl/translation';
import { ChildProcess, execSync, spawn } from 'child_process';
import { EventEmitter } from 'events';
import copy from 'fast-copy';
import { existsSync } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { delimiter } from 'path';

import { IDLMachineWrapper } from './wrappers/idl-machine-wrapper.class';
import { IDLStdIOWrapper } from './wrappers/idl-std-io-wrapper.class';

/**
 * Class that manages and spawns a session of IDL with event-emitter events
 * for when major actions happen.
 */
export class IDLProcess extends EventEmitter {
  /** Reference to our child process */
  idl: ChildProcess;

  /** Have we started IDL or not? */
  started = false;

  /** Are we in the process of closing? */
  closing = false;

  /** Whether we emit event for standard out or not */
  silent = false;

  /** Information about our current IDL session */
  idlInfo = copy(DEFAULT_IDL_INFO);

  /** The logger for our session of IDL, all messages go through this */
  log: Logger;

  /** Fully-qualified path to vscode.pro, needed for auxiliary IDL routines */
  vscodeProDir: string;

  /** Flag that indicates if we are evaluating a statement or not */
  evaluating = false;

  /** Currently captured output from stdout/stderr */
  capturedOutput = '';

  /**
   * Old way of interacting with IDL
   */
  _legacy: IDLStdIOWrapper;

  /**
   * IDL machine
   */
  _machine: IDLMachineWrapper;

  /**
   * Have we started the IDL Machine or just legacy IDL?
   */
  isMachine = false;

  /** Optional message to emit on startup for users */
  startupMessage: string;

  /**
   * @param startupMessage The message we print to standard error on non IDL Machine startups
   */
  constructor(log: Logger, vscodeProDir: string, startupMessage: string) {
    super();
    this.log = log;
    this.vscodeProDir = vscodeProDir;
    this.startupMessage = startupMessage;

    // create classes
    this._legacy = new IDLStdIOWrapper(this);
    this._machine = new IDLMachineWrapper(this);
  }

  /**
   * Wraps node.js event emitter with types for supported events and
   * event data.
   */
  emit<T extends IDLEvent>(event: T, ...args: IDLListenerArgs<T>) {
    return super.emit(event, ...args);
  }

  /**
   * Wraps node.js event emitter with types for supported events and
   * event data.
   */
  on<T extends IDLEvent>(
    event: T,
    listener: (...args: IDLListenerArgs<T>) => void
  ): this {
    return super.on(event, listener);
  }

  /**
   * Wraps node.js event emitter with types for supported events and
   * event data.
   */
  once<T extends IDLEvent>(
    event: T,
    listener: (...args: IDLListenerArgs<T>) => void
  ): this {
    return super.once(event, listener);
  }

  /**
   * Start our debugging session
   */
  start(args: IStartIDLConfig) {
    // reset props if needed
    if (this.started) {
      return;
    }

    // make sure we have our vscode file
    if (!existsSync(this.vscodeProDir)) {
      this.log.log({
        type: 'error',
        content: [
          `Unable to start IDL. Auxiliary PRO code directory not found at expected location:`,
          `"${this.vscodeProDir}"`,
        ],
      });
      this.emit(IDL_EVENT_LOOKUP.FAILED_START, 'Failed to start IDL');
      return;
    }

    // set the location of IDL as variable if it is not already
    if (!('IDL_DIR' in args.env)) {
      args.env.IDL_DIR = path.dirname(path.dirname(args.config.IDL.directory));
    }

    // make sure the DLM path is also set
    if (!('IDL_DLM_PATH' in args.env)) {
      args.env.IDL_DLM_PATH = `+${args.config.IDL.directory}`;
    } else {
      args.env.IDL_DLM_PATH = `${args.env.IDL_DLM_PATH}${delimiter}+${args.config.IDL.directory}`;
    }

    // add a path for the directory
    if (!('IDL_PATH' in args.env)) {
      args.env.IDL_PATH = `+${this.vscodeProDir}`;
    } else {
      args.env.IDL_PATH =
        `+${this.vscodeProDir}` + delimiter + args.env.IDL_PATH;
    }

    /** Get path variable which, for windows is "Path" and not "PATH" */
    const pathVar = os.platform() === 'win32' ? 'Path' : 'PATH';

    // make sure IDL is also on the path
    if (pathVar in args.env) {
      if (!args.env[pathVar].includes(args.config.IDL.directory)) {
        args.env[pathVar] =
          args.config.IDL.directory + delimiter + args.env[pathVar];
      }
    } else {
      args.env[pathVar] = args.config.IDL.directory;
    }

    // check if we need to manage the language environment variable
    if (os.platform() === 'darwin') {
      if (!('LANG' in args.env)) {
        args.env['LANG'] = `${execSync(`defaults read -g AppleLocale`)
          .toString()
          .trim()}.UTF-8`;
      }
    }

    // check for IDL machine
    if (os.platform() === 'win32') {
      this.isMachine = existsSync(
        path.join(args.config.IDL.directory, 'idl_machine.exe')
      );
    } else {
      this.isMachine = existsSync(
        path.join(args.config.IDL.directory, 'idl_machine')
      );
    }

    /**
     * If not the IDL machine, set the prompt because we need this with stdio
     */
    if (this.isMachine) {
      args.env.IDL_IS_IDL_MACHINE = 'true';
    } else {
      args.env.IDL_PROMPT = 'IDL> ';
    }

    // build the command for starting IDL
    const cmd = `${args.config.IDL.directory}${path.sep}${
      this.isMachine ? 'idl_machine' : 'idl'
    }`;

    // start our idl debug session and wait for prompt ready
    this.log.log({
      type: 'info',
      content: [
        'Starting IDL',
        {
          cmd,
          dir: args.env.IDL_DIR,
          path: args.env.IDL_PATH,
          dlm_path: args.env.IDL_DLM_PATH,
        },
      ],
    });

    // launch IDL with the environment from our parent process and in the specified folder
    this.idl = spawn(cmd, null, {
      env: args.env,
      cwd: args.cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    // check for errors
    if (!this.idl.stdout || !this.idl.stderr || !this.idl.stdin) {
      this.log.log({
        type: 'error',
        content: [
          `Unable to start IDL. One or more of standard in, out, or error did not initialize:`,
        ],
      });
      this.emit(IDL_EVENT_LOOKUP.FAILED_START, 'Failed to start IDL');
      return;
    }

    // listen to IDL
    if (!this.isMachine) {
      this.emit(IDL_EVENT_LOOKUP.STANDARD_ERR, this.startupMessage);
      this._legacy.listen(this.idl);
    } else {
      this._machine.listen(this.idl);
    }

    /** Error from child process, if we have one */
    let error: Error;

    // listen for errors
    this.idl.on('error', (err) => {
      error = err;
    });

    // listen for closing
    this.idl.stdout.on('close', (code: number, signal: string) => {
      switch (true) {
        case this.closing:
          // do nothing because we are closing IDL
          this.emit(IDL_EVENT_LOOKUP.CLOSED_CLEANLY);
          break;
        case !this.started:
          this.log.log({
            type: 'error',
            content: [
              'Failed to start IDL',
              { cmd, code, signal, capturedOutput: this.capturedOutput, error },
            ],
            alert: `${
              IDL_TRANSLATION.debugger.adapter.failedStart
            } "${this.capturedOutput.trim()}"`,
          });
          this.emit(IDL_EVENT_LOOKUP.FAILED_START, 'Failed to start IDL');
          break;
        default:
          this.log.log({
            type: 'error',
            content: [
              'IDL crashed or was stopped by the user',
              { cmd, code, signal, capturedOutput: this.capturedOutput, error },
            ],
            alert: IDL_TRANSLATION.debugger.adapter.crashed,
          });
          this.emit(IDL_EVENT_LOOKUP.CRASHED, code, signal);
          break;
      }

      // reset properties
      this.stop();
      this.closing = false;
    });
  }

  /**
   * Wraps emitting standard output to make sure all checks happen in one place
   */
  sendOutput(data: any) {
    // send output only if we are not silent
    if (!this.silent) {
      this.emit(IDL_EVENT_LOOKUP.STANDARD_OUT, data);
    }

    /**
     * If we are not evaluating a statement, then do a stop check
     *
     * This handles a case where:
     *
     * 1. I have PRO code with a breakpoint set
     * 2. I start an IDL UI application
     * 3. A UI callback runs the routine with a breakpoint
     *
     * When in this mode, we don't capture the output and save in our variable
     * because it is not directly from the command that we were executing
     */
    if (!this.evaluating && this.started) {
      if (
        REGEX_STOP_DETECTION_BASIC.test(
          this.capturedOutput.replace(/\r*\n/gim, '')
        )
      ) {
        setTimeout(() => {
          this.emit(IDL_EVENT_LOOKUP.STOP, 'stop', {
            file: '$main$',
            index: 0,
            line: 0,
            name: '$main$',
          });
        }, 0);
      }
    }
  }

  /**
   * Stops our IDL debug session
   */
  stop() {
    this.closing = true;
    this.started = false;
    if (!this.isMachine) {
      this._legacy.stop();
    } else {
      this._machine.stop();
    }
    this.idlInfo = { ...DEFAULT_IDL_INFO };
  }

  /**
   * Pause execution
   */
  pause() {
    if (!this.isMachine) {
      this._legacy.pause();
    } else {
      this._machine.pause();
    }
  }

  /**
   * External method to execute something in IDL
   */
  async evaluate(command: string): Promise<string> {
    if (!this.started) {
      throw new Error('IDL is not started');
    }

    if (!this.isMachine) {
      return this._legacy.evaluate(command);
    } else {
      return this._machine.evaluate(command);
    }
  }

  /**
   * Parse output from IDL and check if we have any reasons that we stopped
   */
  stopCheck(origOutput: string): boolean {
    // get rid of bad characters, lots of carriage returns in the output (\r\r\n) on windows at least
    const output = origOutput.replace(REGEX_NEW_LINE_COMPRESS, '');

    this.log.log({
      type: 'debug',
      content: `Error check output`,
    });

    // check for traceback information
    const reasons: StopReason[] = [];
    const traceback: IDLCallStackItem[] = [];
    let m: RegExpExecArray;
    while ((m = REGEX_STOP_DETECTION.exec(output)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === REGEX_STOP_DETECTION.lastIndex) {
        REGEX_STOP_DETECTION.lastIndex++;
      }

      // extract traceback
      traceback.push({
        file: m[4],
        line: parseInt(m[3]),
        index: 0,
        name: m[2].replace(/ /, ''),
      });

      // find the reason
      switch (true) {
        case m[1].includes('% Execution halted at'):
          reasons.push(IDL_STOPS.ERROR);
          break;
        case m[1].includes('% Breakpoint'):
          reasons.push(IDL_STOPS.BREAKPOINT);
          break;
        case m[1].includes('% Stepped to'):
          reasons.push(IDL_STOPS.STEP);
          break;
        case m[1].includes('% Stop encountered'):
          reasons.push(IDL_STOPS.STOP);
          break;
        default:
          reasons.push(IDL_STOPS.BREAKPOINT);
      }
    }

    // check if we need to emit an event
    // TODO: the traceback is not always correct, but it is not used, just sent with the event
    // vscode makes a request for the traceback instead
    if (traceback.length > 0) {
      this.emit(
        IDL_EVENT_LOOKUP.STOP,
        reasons[reasons.length - 1],
        traceback[traceback.length - 1]
      );
    }

    // return flag if we found a reason to stop
    return traceback.length > 0;
  }
}
