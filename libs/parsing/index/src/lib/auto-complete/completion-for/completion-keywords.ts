import { AdjustCase } from '@idl/assembling/shared';
import {
  FindDirectBranchChildren,
  IParsed,
  TreeToken,
} from '@idl/parsing/syntax-tree';
import { GetSortIndexForStrings } from '@idl/shared';
import { TOKEN_NAMES, TokenName } from '@idl/tokenizer';
import { IDL_TRANSLATION } from '@idl/translation';
import {
  IKeywordCompletionOptions,
  KeywordCompletion,
} from '@idl/types/auto-complete';
import {
  GlobalIndexedRoutineToken,
  IDL_TYPE_LOOKUP,
  IDLTypeHelper,
  IParameterLookup,
} from '@idl/types/core';
import { CompletionItemKind } from 'vscode-languageserver';

import { FindKeyword } from '../../helpers/get-keyword';
import {
  CALL_ROUTINE_TOKENS,
  CallRoutineToken,
} from '../../helpers/get-keywords.interface';
import { GetRoutine } from '../../helpers/get-routine';
import { IDLIndex } from '../../idl-index.class';
import { BuildCompletionItemsArg } from '../build-completion-items.interface';
import { COMPLETION_SORT_PRIORITY } from '../completion-sort-priority.interface';

/**
 * If we encounter these tokens, remove the "/" for boolean keywords
 */
const BINARY_TOKEN_CHECK: { [key: string]: any } = {};
BINARY_TOKEN_CHECK[TOKEN_NAMES.OPERATOR] = true;
BINARY_TOKEN_CHECK[TOKEN_NAMES.KEYWORD_BINARY] = true;

/**
 * Creates options for keyword auto-complete
 */
export function GetKeywordCompletionOptions(
  parsed: IParsed,
  index: IDLIndex,
  token: TreeToken<TokenName>
): IKeywordCompletionOptions {
  /** Get matching global token */
  const global = GetRoutine(index, parsed, token, true);

  /** Defined keywords */
  const defined: IParameterLookup = global.length > 0 ? global[0].meta.kws : {};

  // find the right parent
  let local: CallRoutineToken =
    token.name in CALL_ROUTINE_TOKENS ? (token as CallRoutineToken) : undefined;

  // check if we need to search up our scop eto find a place where keywords
  // could come from
  if (local === undefined) {
    for (let i = token.scopeTokens.length - 1; i > 0; i--) {
      if (token.scopeTokens[i].name in CALL_ROUTINE_TOKENS) {
        local = token.scopeTokens[i] as CallRoutineToken;
        break;
      }
    }
  }

  // check if our immediate parent is "/"
  let binaryAdd = '/';
  let forceBinary = false;
  if (token.name in BINARY_TOKEN_CHECK) {
    if (token.match[0].trim().startsWith('/')) {
      binaryAdd = '';
      forceBinary = true;
    }
  }

  // get local keywords - check if we have
  const used =
    local === undefined
      ? []
      : FindDirectBranchChildren(local, TOKEN_NAMES.KEYWORD)
          .map(
            (kw) =>
              FindKeyword(
                kw.match[0].toLowerCase(),
                defined,
                true
              )?.display.toLowerCase() || kw.match[0].toLowerCase()
          )
          .concat(
            FindDirectBranchChildren(local, TOKEN_NAMES.KEYWORD_BINARY).map(
              (kw) =>
                FindKeyword(
                  kw.match[0].toLowerCase().substring(1),
                  defined,
                  true
                )?.display.toLowerCase() ||
                kw.match[0].toLowerCase().substring(1)
            )
          );

  return {
    global: global[0],
    used,
    binaryAdd,
    forceBinary,
  };
}

/**
 * Adds keyword completion keywords to functions
 */
export function BuildKeywordCompletionItems(
  arg: BuildCompletionItemsArg<KeywordCompletion>
) {
  // get our defined keywords
  let defined: IParameterLookup = {};

  /**
   * Find global token in our lookup
   */
  if (arg.options.global) {
    /**
     * Specify type which matches from up above
     */
    const global: GlobalIndexedRoutineToken[] =
      arg.index.globalIndex.findMatchingGlobalToken(
        arg.options.global.type,
        arg.options.global.name
      );

    if (global.length > 0) {
      defined = global[0].meta.kws;
    }
  }

  // add all of our defined keywords
  let kws: string[] = Object.keys(defined);

  // sort
  kws = GetSortIndexForStrings(kws).map((val) => kws[val]);

  // process keywords
  for (let i = 0; i < kws.length; i++) {
    // make sure we havent used it already
    if (arg.options.used.indexOf(kws[i]) === -1) {
      // get keyword
      const kw = defined[kws[i]];

      // get display name of our keyword
      const display = AdjustCase(kw.display, arg.formatting.style.keywords);

      // add keyword
      arg.complete.push({
        label: display + ' = ',
        insertText:
          arg.options.forceBinary ||
          IDLTypeHelper.isType(kw.type, IDL_TYPE_LOOKUP.BOOLEAN)
            ? arg.options.binaryAdd + display
            : display + ' = ',
        kind: CompletionItemKind.EnumMember,
        sortText: COMPLETION_SORT_PRIORITY.KEYWORDS,
        detail: IDL_TRANSLATION.autoComplete.detail.keyword,
        documentation: kw.docs,
      });
    }
  }
}
