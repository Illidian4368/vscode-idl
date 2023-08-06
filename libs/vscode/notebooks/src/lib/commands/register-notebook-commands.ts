import { IDL_NOTEBOOK_LOG } from '@idl/logger';
import {
  ConvertDocsToNotebook,
  DOCS_NOTEBOOK_FOLDER,
} from '@idl/notebooks/shared';
import { IDL_COMMANDS, IDL_NOTEBOOK_EXTENSION, Sleep } from '@idl/shared';
import { IDL_TRANSLATION } from '@idl/translation';
import { USAGE_METRIC_LOOKUP } from '@idl/usage-metrics';
import {
  IDL_LOGGER,
  LANGUAGE_SERVER_MESSENGER,
  LogCommandError,
  LogCommandInfo,
} from '@idl/vscode/client';
import { IRetrieveDocsPayload } from '@idl/vscode/events/messages';
import {
  OpenNotebookInVSCode,
  VSCodeTelemetryLogger,
} from '@idl/vscode/shared';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';

import { IDL_NOTEBOOK_CONTROLLER } from '../initialize-notebooks';

// get the command errors from IDL translation
const cmdErrors = IDL_TRANSLATION.commands.errors;

/**
 * Adds commands to VSCode to handle terminal interaction
 */
export function RegisterNotebookCommands(ctx: ExtensionContext) {
  IDL_LOGGER.log({ content: 'Registering notebook commands' });

  ctx.subscriptions.push(
    vscode.commands.registerCommand(IDL_COMMANDS.NOTEBOOKS.RESET, async () => {
      try {
        VSCodeTelemetryLogger(USAGE_METRIC_LOOKUP.RUN_COMMAND, {
          idl_command: IDL_COMMANDS.NOTEBOOKS.RESET,
        });

        LogCommandInfo('Resetting IDL (notebook)');

        // make sure we have launched IDL
        if (IDL_NOTEBOOK_CONTROLLER.isStarted()) {
          await IDL_NOTEBOOK_CONTROLLER.stop();
          await Sleep(100);
          await IDL_NOTEBOOK_CONTROLLER.launchIDL(
            IDL_TRANSLATION.notebooks.notifications.resettingIDL
          );
        } else {
          IDL_LOGGER.log({
            type: 'info',
            log: IDL_NOTEBOOK_LOG,
            content: IDL_TRANSLATION.notebooks.notifications.idlNotStarted,
            alert: IDL_TRANSLATION.notebooks.notifications.idlNotStarted,
          });
        }

        return true;
      } catch (err) {
        LogCommandError(
          'Error resetting notebook',
          err,
          cmdErrors.notebooks.resetIDL
        );
        return false;
      }
    })
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand(IDL_COMMANDS.NOTEBOOKS.STOP, async () => {
      try {
        VSCodeTelemetryLogger(USAGE_METRIC_LOOKUP.RUN_COMMAND, {
          idl_command: IDL_COMMANDS.NOTEBOOKS.STOP,
        });

        LogCommandInfo('Stopping IDL (notebook)');

        // check if launched
        if (IDL_NOTEBOOK_CONTROLLER.isStarted()) {
          // trigger reset and create promise
          const prom = IDL_NOTEBOOK_CONTROLLER.stop();

          // show startup progress
          vscode.window.withProgress(
            {
              location: vscode.ProgressLocation.Notification,
              cancellable: false,
              title: IDL_TRANSLATION.notebooks.notifications.stoppingIDL,
            },
            () => {
              return prom;
            }
          );

          // wait for finish
          await prom;
        } else {
          IDL_LOGGER.log({
            type: 'info',
            log: IDL_NOTEBOOK_LOG,
            content: IDL_TRANSLATION.notebooks.notifications.idlNotStarted,
            alert: IDL_TRANSLATION.notebooks.notifications.idlNotStarted,
          });
        }

        return true;
      } catch (err) {
        LogCommandError(
          'Error stopping notebook',
          err,
          cmdErrors.notebooks.stopIDL
        );
        return false;
      }
    })
  );

  ctx.subscriptions.push(
    vscode.commands.registerCommand(
      IDL_COMMANDS.NOTEBOOKS.HELP_AS_NOTEBOOK,
      async (arg: IRetrieveDocsPayload) => {
        try {
          // return if no arg
          if (arg === undefined) {
            return;
          }

          // make folder if it doesnt exist
          if (!existsSync(DOCS_NOTEBOOK_FOLDER)) {
            mkdirSync(DOCS_NOTEBOOK_FOLDER, { recursive: true });
          }

          const file = join(
            DOCS_NOTEBOOK_FOLDER,
            `docs.${arg.name.toLowerCase().replace(/!|:/gim, '_')}.${
              arg.type
            }${IDL_NOTEBOOK_EXTENSION}`
          );

          /**
           * Get docs
           */
          const resp = await LANGUAGE_SERVER_MESSENGER.sendRequest(
            'retrieve-docs',
            arg
          );

          const converted = await ConvertDocsToNotebook(arg, resp.docs);

          // check if we have no examples
          if (converted === undefined) {
            vscode.window.showInformationMessage(
              IDL_TRANSLATION.notebooks.notifications.noExamplesFoundInDocs
            );
            return false;
          }

          // make notebook and save to disk
          writeFileSync(file, await ConvertDocsToNotebook(arg, resp.docs));

          // open the notebook in vscode
          OpenNotebookInVSCode(file, true, true);

          // return as though we succeeded
          return true;
        } catch (err) {
          LogCommandError(
            'Error stopping notebook',
            err,
            cmdErrors.notebooks.helpAsNotebook
          );
          return false;
        }
      }
    )
  );
}
