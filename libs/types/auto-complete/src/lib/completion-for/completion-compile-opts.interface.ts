/**
 * Auto-complete for compile opt statements
 */
export type CompileOptCompletion = 'compile-opt';

/**
 * Options for adding compile-opt auto-complete
 */
export interface ICompileOptCompletionOptions {
  /**
   * Current compile opt options
   */
  current: string[];
}
