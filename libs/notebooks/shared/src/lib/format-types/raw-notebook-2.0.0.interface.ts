import {
  IDLRawNotebookCellBase,
  IDLRawNotebookCellOutputBase,
} from './raw-notebook.interface';

/**
 * Raw notebook cell outputs
 */
export interface RawNotebookCellOutputItem_2_0_0
  extends IDLRawNotebookCellOutputBase {
  /** Array of strings that represents cell content, split on new lines */
  content: string[];
}

/**
 * Raw notebook cell outputs
 */
export interface RawNotebookCellOutput_2_0_0 {
  /** Output Items */
  items: RawNotebookCellOutputItem_2_0_0[];
  /**
   * Notebook cell metadata
   */
  metadata?: { [key: string]: any };
}

/**
 * Data structure for notebook cells
 *
 * DO NOT CHANGE PROPERTY NAMES AS THIS BREAKS PARSING
 */
export interface RawNotebookCell_2_0_0 extends IDLRawNotebookCellBase {
  /**
   * Content of the cell, base64 encoded string
   */
  content: string[];
  /**
   * Output data for our cell
   *
   * TODO: Do we need our own format in case VSCode changes this data structure??
   */
  outputs?: RawNotebookCellOutput_2_0_0[];
}
