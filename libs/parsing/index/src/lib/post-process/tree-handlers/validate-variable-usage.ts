import {
  ILocalTokenLookup,
  IParsed,
  SyntaxProblemWithoutTranslation,
} from '@idl/parsing/syntax-tree';
import { IDL_TRANSLATION } from '@idl/translation';
import { IDL_PROBLEM_CODES } from '@idl/types/problem-codes';

/**
 * Variables that we skip
 */
const SKIP_VARIABLES: { [key: string]: undefined } = {};
SKIP_VARIABLES['self'] = undefined;

/**
 * Helper function that validates variable usage
 */
function _Validate(parsed: IParsed, local: ILocalTokenLookup) {
  const variables = Object.values(local);

  // process variables that are only added once to add highlighting indicating that they are unused
  for (let i = 0; i < variables.length; i++) {
    // check for variable names that we need to skip
    if (variables[i].name in SKIP_VARIABLES) {
      continue;
    }

    /**
     * If we have a file, then we come from an include file and should be ignored
     */
    if (variables[i].file !== undefined) {
      continue;
    }

    /**
     * Skip variables that are not defined as they get a different error
     */
    if (!variables[i].meta.isDefined || variables[i].meta.isStaticClass) {
      continue;
    }

    // do we only have it being reported one time
    if (variables[i].meta.usage.length <= 1) {
      parsed.postProcessProblems.push(
        SyntaxProblemWithoutTranslation(
          IDL_PROBLEM_CODES.UNUSED_VARIABLE,
          `${
            IDL_TRANSLATION.parsing.errors[IDL_PROBLEM_CODES.UNUSED_VARIABLE]
          } "${variables[i].meta.display}"`,
          variables[i].pos,
          variables[i].pos
        )
      );
    }
  }
}

/**
 * Helper function that validates variable usage
 *
 * Meaning we check to see if variables are defined or not
 *
 * This is pretty lightweight and uses derived information from the
 * syntax tree to do the evaluation.
 */
export function ValidateVariableUsage(
  parsed: IParsed,
  local: ILocalTokenLookup
) {
  _Validate(parsed, local);
}
