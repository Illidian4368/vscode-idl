import { ObjectifyError } from '@idl/error-shared';
import * as minilog from 'minilog';

import { LogInterceptor } from './log-manager.interface';
import {
  IBasicLogOptions,
  LogAlertCallback,
  LogType,
  PRETTY_LOG_NAMES,
  UGLY_LOG_NAMES,
} from './logger.interface';
import { StringifyData, StringifyDataForLog } from './stringify-data';

minilog.enable();

/**
 * Simply class that emulates the library Minilog which doesn't have types. Since we can use the library
 * chalk with the utils lib to do the same, we will!
 *
 * for old times sakes, here is the lib we started with: https://github.com/mixu/minilog
 */
export class Logger {
  /** The file that we write our log to */
  file?: string;

  /** The name of our log, printed out first */
  name: string;

  /** reference to minilog */
  mlog: minilog;

  /** Do we print debug statements */
  enableDebugLogs = false;

  /** Callback when we get a message to alert */
  alertCb: LogAlertCallback;

  /** If we should not use fancy formatting when printing to the console */
  logUgly = false;

  /** If we are quiet and dont log output to the console, still allows file logging */
  quiet = false;

  /** optionally set a log interceptor to interrupt any logging messages */
  interceptor?: LogInterceptor;

  constructor(
    name: string,
    enableDebugLogs = false,
    alertCb: LogAlertCallback,
    logUgly = false
  ) {
    // save properties
    this.name = name;
    this.mlog = minilog(name);
    this.enableDebugLogs = enableDebugLogs;
    this.alertCb = alertCb;
    this.logUgly = logUgly;
  }

  /**
   * Clean up our log which just removes the write stream if we have it
   */
  destroy() {
    // this.stream?.close();
  }

  /**
   * Log debug data to the console
   */
  debug(data: any) {
    this.logItem('debug', data);
  }

  /**
   * Log an error to the console
   */
  error(data: any) {
    this.logItem('error', data);
  }

  /**
   * Log information to the console
   */
  info(data: any) {
    this.logItem('info', data);
  }

  /**
   * Log a warning to the console
   */
  warn(data: any) {
    this.logItem('warn', data);
  }

  /**
   * Logs data to the console following similar API as log manager
   */
  log(options: IBasicLogOptions) {
    // check if we exclude debug logging items
    if (!this.enableDebugLogs && options?.type === 'debug') {
      return;
    }

    if (this.interceptor !== undefined) {
      // get data we are sending
      const data = options.content;

      // always have an array that we log
      const useData = !Array.isArray(data) ? [data] : data;

      // replace any error objects
      for (let i = 0; i < useData.length; i++) {
        if (useData[i] instanceof Error) {
          useData[i] = ObjectifyError(useData[i]);
        }
      }

      // update property
      options.content = useData;

      // call our interceptor
      this.interceptor({ log: this.name, ...options });

      // check if we have an alert to listen for
      if (options.alert) {
        this.alertCb(options);
      }

      // return and dont do what we have below
      return;
    }

    // log information
    this.logItem(options.type, options.content);

    // check if we have something to alert
    if (options.alert) {
      this.alertCb(options);
    }
  }

  /**
   * Generic log method where you can specify the log type and the data to log
   * */
  private logItem(type: LogType, data: any) {
    // check if we exclude debug logging items
    if (!this.enableDebugLogs && type === 'debug') {
      return;
    }

    // always have an array that we log
    const useData = !Array.isArray(data) ? [data] : data;

    // replace any error objects
    for (let i = 0; i < useData.length; i++) {
      if (useData[i] instanceof Error) {
        useData[i] = ObjectifyError(useData[i]);
      }
    }

    // process each item
    for (let i = 0; i < useData.length; i++) {
      // for the first, use special formatting with the log name
      if (i === 0) {
        // set default log info
        // let prettyLogType = PRETTY_LOG_NAMES.log;
        let uglyLogType = UGLY_LOG_NAMES.log;

        // check if we have a type that we know about
        if (type in PRETTY_LOG_NAMES) {
          // prettyLogType = PRETTY_LOG_NAMES[type];
          uglyLogType = UGLY_LOG_NAMES[type];
        }

        // skip if not allowed to log to console
        if (this.quiet) {
          continue;
        }

        // check if we need to log ugly
        if (this.logUgly) {
          this._consoleLogUgly(`${this.name} ${uglyLogType} `, useData[i]);
          continue;
        }

        // convert data to a string
        const toWrite = StringifyData(useData[i], true);

        // print to the console with minilog since chalk isnt working
        switch (type) {
          case 'info':
            this.mlog.info(toWrite);
            break;
          case 'debug':
            this.mlog.debug(toWrite);
            break;
          case 'error':
            this.mlog.error(toWrite);
            break;
          case 'warn':
            this.mlog.warn(toWrite);
            break;
          default:
            this.mlog.log(toWrite);
            break;
        }
        // this._logPretty(
        //   `${chalk.gray(this.name)} ${prettyLogType} `,
        //   useData[i]
        // );
      } else {
        // skip if not allowed to log to console
        if (this.quiet) {
          continue;
        }

        // print to the console
        if (this.logUgly) {
          this._consoleLogUgly('', useData[i], true);
          continue;
        } else {
          this._logPretty('', useData[i], true);
        }
      }
    }
  }

  /**
   * Nicely logs content to the console for us
   *
   * @private
   * @param {string} front The front part of the string with name/formatting applied
   * @param {*} data The data to write to disk
   */
  private _logPretty(front: string, data: any, indent = false) {
    console.log(StringifyDataForLog(front, data, indent, true));
  }

  /**
   * Logs plain text to the console
   *
   * @private
   * @param {string} front The front part of the string with name/formatting applied
   * @param {*} data The data to write to disk
   */
  private _consoleLogUgly(front: string, data: any, indent = false) {
    console.log(`${StringifyDataForLog(front, data, indent, false)}\n`);
  }
}
