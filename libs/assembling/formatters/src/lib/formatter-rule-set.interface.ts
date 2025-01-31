import {
  IParsed,
  ITreeRecurserCurrent,
  TreeToken,
} from '@idl/parsing/syntax-tree';
import { TokenName } from '@idl/tokenizer';

/**
 * Callback to format our tokens.
 *
 * Formatting tokens will use the first match for the start or end
 * of tokens in the actual code.
 */
export type TokenFormatter<T extends TokenName> = (
  token: TreeToken<T>,
  current: ITreeRecurserCurrent,
  parsed: IParsed
) => void;

/**
 * Lookup containing callbacks to format the start of our tokens, by token type
 */
export type FormatterRuleSet = {
  [property in TokenName]?: TokenFormatter<property>;
};
