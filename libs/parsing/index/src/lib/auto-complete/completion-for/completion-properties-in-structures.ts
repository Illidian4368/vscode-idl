import { FormatterType, IAssemblerOptions } from '@idl/assembling/config';
import { TransformCase } from '@idl/assembling/shared';
import {
  FindDirectBranchChildren,
  GetPropertyName,
  TreeToken,
} from '@idl/parsing/syntax-tree';
import { StructureNameToken, TOKEN_NAMES } from '@idl/tokenizer';
import { IDL_TRANSLATION } from '@idl/translation';
import {
  IPropertyInStructureCompletionOptions,
  PropertyInStructureCompletion,
} from '@idl/types/auto-complete';
import { GLOBAL_TOKEN_TYPES } from '@idl/types/core';
import { CompletionItem, CompletionItemKind } from 'vscode-languageserver';

import { IDLIndex } from '../../idl-index.class';
import { BuildCompletionItemsArg } from '../build-completion-items.interface';
import { COMPLETION_SORT_PRIORITY } from '../completion-sort-priority.interface';

/**
 *Recursively finds properties and adds them to our completion list if we have not
 used them before.
 */
function ResolveProperties(
  complete: CompletionItem[],
  index: IDLIndex,
  formatting: IAssemblerOptions<FormatterType>,
  structureName: string,
  found: { [key: string]: any } = {}
) {
  // find matching global tokens
  const global = index.findMatchingGlobalToken(
    GLOBAL_TOKEN_TYPES.STRUCTURE,
    structureName
  );

  // check if we have a match
  if (global.length > 0) {
    // get properties
    const properties = global[0].meta.props;

    // get property names
    const names = Object.keys(properties);

    // process all properties if they have not been found already
    for (let i = 0; i < names.length; i++) {
      if (!(names[i] in found)) {
        const display = TransformCase(
          properties[names[i]].display,
          formatting.style.properties
        );
        // add to completion
        complete.push({
          label: display,
          insertText: display + ':',
          kind: CompletionItemKind.Field,
          sortText: COMPLETION_SORT_PRIORITY.PROPERTIES,
          detail: `${IDL_TRANSLATION.autoComplete.detail.property} ${global[0].meta.display}`,
          documentation: properties[names[i]].docs,
        });

        // save as a match
        found[names[i]] = true;
      }
    }

    // process inheritance
    const inherits = global[0].meta.inherits;
    for (let i = 0; i < inherits.length; i++) {
      ResolveProperties(complete, index, formatting, inherits[i], found);
    }
  }
}

/**
 * Get options to do auto-complete in structures
 */
export function GetPropertyInStructureCompletionOptions(
  token: TreeToken<StructureNameToken>
): IPropertyInStructureCompletionOptions {
  // get the name of of our structure
  const name = token.match[0];

  // init properties that we have found
  const found: { [key: string]: boolean } = {};

  // find child properties that we have already used
  const props = FindDirectBranchChildren(token, TOKEN_NAMES.STRUCTURE_PROPERTY);
  for (let i = 0; i < props.length; i++) {
    found[GetPropertyName(props[i]).toLowerCase()] = true;
  }

  return {
    name,
    found,
  };
}

/**
 * Adds keyword completion properties inside of structures
 */
export function BuildPropertyInStructureCompletionItems(
  arg: BuildCompletionItemsArg<PropertyInStructureCompletion>
) {
  // resolve properties
  ResolveProperties(
    arg.complete,
    arg.index,
    arg.formatting,
    arg.options.name,
    arg.options.found
  );
}
