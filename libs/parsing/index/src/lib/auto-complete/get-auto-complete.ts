import { FormatterType, IAssemblerOptions } from '@idl/assembling/config';
import {
  GetTokenAtCursor,
  IBranch,
  IsWithinToken,
  TreeBranchToken,
} from '@idl/parsing/syntax-tree';
import { StructureNameToken, TOKEN_NAMES } from '@idl/parsing/tokenizer';
import { IDLExtensionConfig } from '@idl/vscode/extension-config';
import { GetAutoCompleteResponse } from '@idl/workers/parsing';
import { MarkupKind, Position } from 'vscode-languageserver/node';

import { GetTypeBefore } from '../helpers/get-type-before';
import { ResolveHoverHelpLinks } from '../helpers/resolve-hover-help-links';
import { IDLIndex } from '../idl-index.class';
import { AddCompletionExecutiveCommands } from './completion-for/add-completion-executive-commands';
import { AddCompletionFunctionMethods } from './completion-for/add-completion-function-methods';
import { AddCompletionFunctions } from './completion-for/add-completion-functions';
import { AddCompletionInclude } from './completion-for/add-completion-include';
import { AddCompletionKeywords } from './completion-for/add-completion-keywords';
import { AddCompletionProcedureMethods } from './completion-for/add-completion-procedure-methods';
import { AddCompletionProcedures } from './completion-for/add-completion-procedures';
import { AddCompletionProperties } from './completion-for/add-completion-properties';
import { AddCompletionPropertiesInStructures } from './completion-for/add-completion-properties-in-structures';
import { AddCompletionStructureNames } from './completion-for/add-completion-structure-names';
import { AddCompletionSystemVariables } from './completion-for/add-completion-system-variables';
import { AddCompletionVariables } from './completion-for/add-completion-variables';
import {
  FUNCTIONS,
  KEYWORD_COMPLETION,
  KEYWORDS,
  METHOD_INTERIOR_CHECK,
  METHOD_PROPERTY_COMPLETION,
  NO_PAREN,
  NO_PROPERTIES,
  PROCEDURES,
} from './get-auto-complete.interface';

/**
 * Tokens that we dont do anything for
 */
const SKIP_THESE_TOKENS: { [key: string]: any } = {};
SKIP_THESE_TOKENS[TOKEN_NAMES.LINE_CONTINUATION] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.COMMENT] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.COMMENT_BLOCK] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.ROUTINE_NAME] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.ROUTINE_METHOD_NAME] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.QUOTE_DOUBLE] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.QUOTE_SINGLE] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.STRING_TEMPLATE_STRING] = true;
SKIP_THESE_TOKENS[TOKEN_NAMES.NUMBER] = true;

/**
 * Tokens that we dont do anything for
 */
const SKIP_THESE_PARENTS: { [key: string]: any } = {};
SKIP_THESE_PARENTS[TOKEN_NAMES.LINE_CONTINUATION] = true;
SKIP_THESE_PARENTS[TOKEN_NAMES.COMMENT] = true;
SKIP_THESE_PARENTS[TOKEN_NAMES.COMMENT_BLOCK] = true;
SKIP_THESE_PARENTS[TOKEN_NAMES.ROUTINE_NAME] = true;
SKIP_THESE_PARENTS[TOKEN_NAMES.ROUTINE_METHOD_NAME] = true;
// SKIP_THESE_PARENTS[TOKEN_NAMES.CALL_LAMBDA_FUNCTION] = true;

/**
 * Returns text for hover help
 */
export async function GetAutoComplete(
  index: IDLIndex,
  file: string,
  code: string | string[],
  position: Position,
  config: IDLExtensionConfig,
  formatting: IAssemblerOptions<FormatterType>
): Promise<GetAutoCompleteResponse> {
  // initialize the value of our help
  const items: GetAutoCompleteResponse = [];

  // get the tokens for our file
  const parsed = await index.getParsedProCode(file, code, {
    postProcess: true,
  });
  if (parsed !== undefined) {
    // determine what we have hovered over
    const cursor = GetTokenAtCursor(parsed, position);

    // unpack for easier access
    const global = cursor.globalParent;
    const local = cursor.localParent;
    let token = cursor.token;

    // check if we have a comma and need to go up a level
    if (token?.name === TOKEN_NAMES.COMMA) {
      if (token.scopeTokens.length > 0) {
        token = token.scopeTokens[token.scopeTokens.length - 1];
        cursor.token = token;
        cursor.accessTokens = token.accessTokens;
        cursor.scope = token.scope;
      }
    }

    /**
     * Check if we have a parent that we are supposed to skip
     */
    const scope = token?.scope || [];
    for (let i = 0; i < scope.length; i++) {
      if (scope[i] in SKIP_THESE_TOKENS) {
        return [];
      }
    }

    /**
     * Handle special cases for auto-complete
     */
    switch (true) {
      case token?.name in SKIP_THESE_TOKENS ||
        local?.name in SKIP_THESE_PARENTS:
        return [];
      case token?.name === TOKEN_NAMES.INCLUDE:
        AddCompletionInclude(items, index);
        return items;
      case token?.name === TOKEN_NAMES.SYSTEM_VARIABLE:
        AddCompletionSystemVariables(items, formatting);
        return items;
      case token?.name === TOKEN_NAMES.EXECUTIVE_COMMAND:
        AddCompletionExecutiveCommands(items, formatting);
        return items;
      case token?.name === TOKEN_NAMES.STRUCTURE && token?.kids?.length === 0:
        AddCompletionStructureNames(items);
        return items;
      case token?.name === TOKEN_NAMES.STRUCTURE_NAME &&
        token?.kids?.length === 0:
        AddCompletionStructureNames(items);
        return items;
      case token?.name === TOKEN_NAMES.STRUCTURE_NAME:
        AddCompletionPropertiesInStructures(
          items,
          index,
          token as IBranch<StructureNameToken>,
          formatting
        );
        return items;
      // return if we have a parent token that we are never supposed to process
      default:
    }

    /** Flag if we should add parentheses to function calls */
    let addParen = true;

    /** Flag if we should include variables in auto-complete */
    let addVariables = true;

    // check if we should add parentheses
    if (token !== undefined) {
      if (token.name in NO_PAREN) {
        switch (true) {
          case position.line === token.pos[0] &&
            position.character >= token.pos[1] + token.pos[2]:
            addParen = true;
            break;
          case IsWithinToken(position, token.pos):
            addParen = false;
            break;
          default:
            break;
        }
      }
    }

    // variables should match paren logic because, if we are in
    // a function call (no paren) then it is definitively a function
    // call and should not have variables
    addVariables = addParen;

    // make sure we have a token so that we can try and add keywords
    if (
      (token !== undefined || cursor.scopeTokens.length > 1) &&
      token?.name !== TOKEN_NAMES.ASSIGNMENT
    ) {
      /**
       * Verify that we can actually add completion for keywords
       *
       * Our detection catches the end of tokens, so we want
       * to exclude being on the outside of the parentheses because
       * we are not technically within the function call, but it is
       * within for procedures and assignment
       */
      let canKeyword =
        token.name in KEYWORD_COMPLETION || token.match[0].trim() === '/';

      // double check we are not a function and in the closing parentheses
      if (token?.name in FUNCTIONS && canKeyword) {
        if ((token as TreeBranchToken).end !== undefined) {
          if (
            IsWithinToken(position, [
              (token as TreeBranchToken).end.pos[0],
              (token as TreeBranchToken).end.pos[1] + 1,
              (token as TreeBranchToken).end.pos[2],
            ])
          ) {
            canKeyword = false;
          }
        }
      }

      // if we can keyword, then add keywords!
      if (canKeyword) {
        AddCompletionKeywords(
          items,
          parsed,
          index,
          token || cursor.scopeTokens[cursor.scopeTokens.length - 1],
          formatting
        );
      }
    }

    // TODO: return if in lambda function?
    const type = GetTypeBefore(index, cursor, parsed);

    /**
     * Flag if we can add method or properties
     */
    let canMethod = token?.name in METHOD_PROPERTY_COMPLETION;
    if (canMethod) {
      /**
       * If we are at the edge of our start, then dont send methods
       */
      if (
        token.name in METHOD_INTERIOR_CHECK &&
        token.pos[1] + token.pos[2] - 1 < position.character
      ) {
        canMethod = false;
      }
    }

    // handle our cases
    switch (true) {
      // if keyword, do nothing else
      case token?.name in KEYWORDS:
        break;
      /**
       * Are we completing methods or properties?
       */
      case canMethod:
        /**
         * Add properties. If we are where we can use a procedure, add another
         * dot for properties because something else needs to come afterwards
         */
        if (!(token?.name in NO_PROPERTIES)) {
          AddCompletionProperties(
            items,
            index,
            type,
            local?.name in PROCEDURES ? '' : '',
            formatting
          );
        }

        // check if we send procedure or function methods
        if (local?.name in PROCEDURES) {
          AddCompletionProcedureMethods(items, index, type);
        } else {
          AddCompletionFunctionMethods(items, index, type, addParen);
        }
        break;
      /**
       * Default is that we can write functions or procedures and
       * should send variables for auto completion super-fun
       */
      default:
        if (addVariables) {
          AddCompletionVariables(items, parsed, global?.token);
          AddCompletionSystemVariables(items, formatting);
        }

        // check if we can send procedures or if it needs to be functions
        if (token?.name in PROCEDURES) {
          AddCompletionProcedures(items);
        } else {
          AddCompletionFunctions(items, formatting, addParen);
        }
    }
  }

  // resolve links in any completion items and indicate that
  // we have markdown to present
  for (let i = 0; i < items.length; i++) {
    if (items[i].documentation) {
      items[i].documentation = {
        kind: MarkupKind.Markdown,
        value: ResolveHoverHelpLinks(items[i].documentation as string, config),
      };
    }
  }

  return items;
}
