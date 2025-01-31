import { LogManager } from '@idl/logger';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { GetExtensionPath } from '@idl/shared';
import { readFile } from 'fs/promises';
import { CompletionItem, Position } from 'vscode-languageserver/node';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Correctly provides auto complete for`, () => {
  it(`[auto generated] things after brackets and parentheses`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // specify filepath
    const filepath = GetExtensionPath(
      'idl/test/auto-complete/bracket_paren.pro'
    );

    // add file to index
    await index.indexFile(filepath);

    // define position
    const position_0: Position = { line: 14, character: 18 };

    // define expected token we extract
    const expectedFound_0: CompletionItem[] = [
      {
        label: 'dim',
        insertText: 'dim',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An array giving the dimensions (0 for scalars).',
        },
      },
      {
        label: 'length',
        insertText: 'length',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'The number of elements in the variable.',
        },
      },
      {
        label: 'ndim',
        insertText: 'ndim',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An integer giving the number of dimensions (0 for scalars).',
        },
      },
      {
        label: 'tname',
        insertText: 'tname',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the raw IDL type name. For structures this returns "STRUCT", while for objects this returns "OBJREF".',
        },
      },
      {
        label: 'typecode',
        insertText: 'typecode',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An integer giving the IDL type code.',
        },
      },
      {
        label: 'typename',
        insertText: 'typename',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the IDL type name. For structures and objects this returns the actual structure or class name.',
        },
      },
      {
        label: 'IDL_Number::ceil()',
        insertText: 'ceil()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::floor()',
        insertText: 'floor()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::imaginary()',
        insertText: 'imaginary()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::max()',
        insertText: 'max()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::mean()',
        insertText: 'mean()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::median()',
        insertText: 'median()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::min()',
        insertText: 'min()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::product()',
        insertText: 'product()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::real()',
        insertText: 'real()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::round()',
        insertText: 'round()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::signum()',
        insertText: 'signum()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::total()',
        insertText: 'total()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::capWords()',
        insertText: 'capWords()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::charAt()',
        insertText: 'charAt()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::compress()',
        insertText: 'compress()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::contains()',
        insertText: 'contains()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::decrypt()',
        insertText: 'decrypt()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::encrypt()',
        insertText: 'encrypt()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::endsWith()',
        insertText: 'endsWith()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::extract()',
        insertText: 'extract()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::indexOf()',
        insertText: 'indexOf()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::insert()',
        insertText: 'insert()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::join()',
        insertText: 'join()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::lastIndexOf()',
        insertText: 'lastIndexOf()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::matches()',
        insertText: 'matches()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::remove()',
        insertText: 'remove()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::replace()',
        insertText: 'replace()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::reverse()',
        insertText: 'reverse()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::split()',
        insertText: 'split()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::startsWith()',
        insertText: 'startsWith()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::strlen()',
        insertText: 'strlen()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::substring()',
        insertText: 'substring()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::toByte()',
        insertText: 'toByte()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::toLower()',
        insertText: 'toLower()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::toUpper()',
        insertText: 'toUpper()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::trim()',
        insertText: 'trim()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::compare()',
        insertText: 'compare()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::convert()',
        insertText: 'convert()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::diff()',
        insertText: 'diff()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::dup()',
        insertText: 'dup()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::equals()',
        insertText: 'equals()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::filter()',
        insertText: 'filter()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::finite()',
        insertText: 'finite()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::fromBits()',
        insertText: 'fromBits()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
    ];

    // verify results
    expect(expectedFound_0).toEqual(
      (
        await index.getAutoComplete(
          filepath,
          await readFile(filepath, 'utf-8'),
          position_0
        )
      ).slice(0, 50)
    );
    // define position
    const position_1: Position = { line: 17, character: 24 };

    // define expected token we extract
    const expectedFound_1: CompletionItem[] = [
      {
        label: 'dim',
        insertText: 'dim',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An array giving the dimensions (0 for scalars).',
        },
      },
      {
        label: 'length',
        insertText: 'length',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'The number of elements in the variable.',
        },
      },
      {
        label: 'ndim',
        insertText: 'ndim',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An integer giving the number of dimensions (0 for scalars).',
        },
      },
      {
        label: 'tname',
        insertText: 'tname',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the raw IDL type name. For structures this returns "STRUCT", while for objects this returns "OBJREF".',
        },
      },
      {
        label: 'typecode',
        insertText: 'typecode',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An integer giving the IDL type code.',
        },
      },
      {
        label: 'typename',
        insertText: 'typename',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the IDL type name. For structures and objects this returns the actual structure or class name.',
        },
      },
      {
        label: 'IDL_String::capWords()',
        insertText: 'capWords()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::charAt()',
        insertText: 'charAt()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::compress()',
        insertText: 'compress()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::contains()',
        insertText: 'contains()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::decrypt()',
        insertText: 'decrypt()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::dup()',
        insertText: 'dup()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::encrypt()',
        insertText: 'encrypt()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::endsWith()',
        insertText: 'endsWith()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::extract()',
        insertText: 'extract()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::indexOf()',
        insertText: 'indexOf()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::insert()',
        insertText: 'insert()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::join()',
        insertText: 'join()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::lastIndexOf()',
        insertText: 'lastIndexOf()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::matches()',
        insertText: 'matches()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::remove()',
        insertText: 'remove()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::replace()',
        insertText: 'replace()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::reverse()',
        insertText: 'reverse()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::split()',
        insertText: 'split()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::startsWith()',
        insertText: 'startsWith()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::strlen()',
        insertText: 'strlen()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::substring()',
        insertText: 'substring()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::toByte()',
        insertText: 'toByte()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::toLower()',
        insertText: 'toLower()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::toUpper()',
        insertText: 'toUpper()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_String::trim()',
        insertText: 'trim()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::compare()',
        insertText: 'compare()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::convert()',
        insertText: 'convert()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::diff()',
        insertText: 'diff()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::equals()',
        insertText: 'equals()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::filter()',
        insertText: 'filter()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::finite()',
        insertText: 'finite()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::fromBits()',
        insertText: 'fromBits()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::hashcode()',
        insertText: 'hashcode()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::hasValue()',
        insertText: 'hasValue()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isFinite()',
        insertText: 'isFinite()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isInfinite()',
        insertText: 'isInfinite()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isNaN()',
        insertText: 'isNaN()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isReal()',
        insertText: 'isReal()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::map()',
        insertText: 'map()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::nestedMap()',
        insertText: 'nestedMap()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::ptrValid()',
        insertText: 'ptrValid()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::reduce()',
        insertText: 'reduce()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::reform()',
        insertText: 'reform()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::shift()',
        insertText: 'shift()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
    ];

    // verify results
    expect(expectedFound_1).toEqual(
      (
        await index.getAutoComplete(
          filepath,
          await readFile(filepath, 'utf-8'),
          position_1
        )
      ).slice(0, 50)
    );
    // define position
    const position_2: Position = { line: 20, character: 17 };

    // define expected token we extract
    const expectedFound_2: CompletionItem[] = [
      {
        label: 'dim',
        insertText: 'dim',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An array giving the dimensions (0 for scalars).',
        },
      },
      {
        label: 'length',
        insertText: 'length',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'The number of elements in the variable.',
        },
      },
      {
        label: 'ndim',
        insertText: 'ndim',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An integer giving the number of dimensions (0 for scalars).',
        },
      },
      {
        label: 'tname',
        insertText: 'tname',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the raw IDL type name. For structures this returns "STRUCT", while for objects this returns "OBJREF".',
        },
      },
      {
        label: 'typecode',
        insertText: 'typecode',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value: 'An integer giving the IDL type code.',
        },
      },
      {
        label: 'typename',
        insertText: 'typename',
        kind: 5,
        sortText: '02',
        detail: 'Property of IDL_Variable',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the IDL type name. For structures and objects this returns the actual structure or class name.',
        },
      },
      {
        label: 'IDL_Number::ceil()',
        insertText: 'ceil()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::floor()',
        insertText: 'floor()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::imaginary()',
        insertText: 'imaginary()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::max()',
        insertText: 'max()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::mean()',
        insertText: 'mean()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::median()',
        insertText: 'median()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::min()',
        insertText: 'min()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::product()',
        insertText: 'product()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::real()',
        insertText: 'real()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::round()',
        insertText: 'round()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::signum()',
        insertText: 'signum()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Number::total()',
        insertText: 'total()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::compare()',
        insertText: 'compare()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::convert()',
        insertText: 'convert()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::diff()',
        insertText: 'diff()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::dup()',
        insertText: 'dup()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::equals()',
        insertText: 'equals()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::filter()',
        insertText: 'filter()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::finite()',
        insertText: 'finite()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::fromBits()',
        insertText: 'fromBits()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::hashcode()',
        insertText: 'hashcode()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::hasValue()',
        insertText: 'hasValue()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isFinite()',
        insertText: 'isFinite()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isInfinite()',
        insertText: 'isInfinite()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isNaN()',
        insertText: 'isNaN()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::isReal()',
        insertText: 'isReal()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::map()',
        insertText: 'map()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::nestedMap()',
        insertText: 'nestedMap()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::ptrValid()',
        insertText: 'ptrValid()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::reduce()',
        insertText: 'reduce()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::reform()',
        insertText: 'reform()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::shift()',
        insertText: 'shift()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::sort()',
        insertText: 'sort()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::toBits()',
        insertText: 'toBits()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::toDouble()',
        insertText: 'toDouble()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::toInteger()',
        insertText: 'toInteger()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::toList()',
        insertText: 'toList()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::toString()',
        insertText: 'toString()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::uniq()',
        insertText: 'uniq()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
      {
        label: 'IDL_Variable::where()',
        insertText: 'where()',
        kind: 2,
        sortText: '03',
        detail: 'Function Method',
        command: { title: 'Cursor Adjust', command: 'cursorLeft' },
      },
    ];

    // verify results
    expect(expectedFound_2).toEqual(
      (
        await index.getAutoComplete(
          filepath,
          await readFile(filepath, 'utf-8'),
          position_2
        )
      ).slice(0, 50)
    );
    // define position
    const position_3: Position = { line: 23, character: 19 };

    // define expected token we extract
    const expectedFound_3: CompletionItem[] = [
      {
        label: 'antialias',
        insertText: 'antialias',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'By default anti-aliasing is used when drawing lines. Set this property to 0 to disable anti-aliasing.',
        },
      },
      {
        label: 'aspect_ratio',
        insertText: 'aspect_ratio',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value indicating the ratio of the Y dimension to the X dimension in data units. If this property is set to a nonzero value, the aspect ratio will be preserved as the graphic is stretched or shrunk. The default value is 0 for all graphics except images, meaning that the aspect ratio is not fixed, but is allowed to change as the graphic is stretched or shrunk.',
        },
      },
      {
        label: 'axes',
        insertText: 'axes',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "This property retrieves an array that contains all of the AXIS objects within the visualization. For example, for a plot visualization:\n\n```idl\n  p = plot(/test)\n  ax = p.axes\n  ax[0].title = 'X axis'\n  ax[1].title = 'Y axis'\n  ax[2].hide = 1 ; hide top X axis\n  ax[3].hide = 1 ; hide right Y axis\n```\n\nSee [AXIS](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/A/AXIS.htm%22%7D) for a list of the available properties.",
        },
      },
      {
        label: 'axis_style',
        insertText: 'axis_style',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to one of the following values:\n\n* 0 - No axes. Decrease the margins so the graphic almost fills the window. This is the default for images.\n* 1 - Single X, Y (and Z if 3D) axes located at the minimum data value. The margins will be adjusted to leave space for the axes. This is the default for 3D graphics.\n* 2 - Box axes - multiple axes located at both the minimum and maximum data values. The margins will be adjusted to leave space for the axes. This is the default for 2D graphics.\n* 3 - Crosshair-style axes - located at the midpoint of each data dimension. Since the axes are in the middle, decrease the margins so the graphic almost fills the window. This is the default for polar plots.\n* 4 - No axes, but use the same margins as if axes were there. This is useful if you want to later add another graphic that does have axes, and you want the two visualizations to be aligned properly.\n\nYou can set the following properties on the axes:\n\n| Property                 | Description                                                                                                                                                                                                                                                                                                                                                                                                            |\n| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| \\[XYZ\\]COLOR             | A string or RGB vector containing the axis color.                                                                                                                                                                                                                                                                                                                                                                      |\n| \\[XYZ\\]GRIDSTYLE         | A string, integer, or 2-element vector giving the linestyle for tickmarks.                                                                                                                                                                                                                                                                                                                                             |\n| \\[XYZ\\]LOG               | Set to 1 if the axis is logarithmic. The minimum value of the axis range must be greater than zero.                                                                                                                                                                                                                                                                                                                    |\n| \\[XYZ\\]MAJOR             | The number of major tick marks. Set to -1 to auto-compute, set to 0 to suppress.                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]MINOR             | The number of minor tick marks. Set to -1 to auto-compute, set to 0 to suppress.                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]SUBGRIDSTYLE      | A string, integer, or 2-element vector giving the linestyle for the minor tickmarks. The default is 0, for solid lines. Set to -1 to force minor ticks to have the same linestyle as major ticks.                                                                                                                                                                                                                      |\n| \\[XYZ\\]SHOWTEXT          | Set to 1 to show text labels or 0 to hide the text labels.                                                                                                                                                                                                                                                                                                                                                             |\n| \\[XYZ\\]STYLE             | The axis range style. The valid values are: (0) Nice range. Default for all graphics except Image, Barplot, and Map. (1) Force the exact data range. Default for Image, Barplot, and Map. (2) Pad the axes slightly beyond the nice range. (3) Pad the axes slightly beyond the exact data range. The \\[XYZ\\]RANGE takes precedence over this property.                                                                |\n| \\[XYZ\\]SUBTICKLEN        | The ratio of the minor tick length to the major tick length. The default is 0.5.                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]TEXT\\_COLOR       | A string or RGB vector containing the axis text color.                                                                                                                                                                                                                                                                                                                                                                 |\n| \\[XYZ\\]TEXT\\_ORIENTATION | The angle (in degrees) of the tick mark labels.                                                                                                                                                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TEXTPOS           | Set to 1 to position text above the axis. The default is 0, below the axis.                                                                                                                                                                                                                                                                                                                                            |\n| \\[XYZ\\]THICK             | Set to a floating-point value between 0 and 10 to specify the line thickness for tickmarks. A thickness of 0 gives a thin hairline. The default is 1.                                                                                                                                                                                                                                                                  |\n| \\[XYZ\\]TICKDIR           | Set to 1 to draw the tickmarks facing outwards. The default is 0, facing inwards.                                                                                                                                                                                                                                                                                                                                      |\n| \\[XYZ\\]TICKFONT\\_NAME    | A string containing the font name for the axis text.                                                                                                                                                                                                                                                                                                                                                                   |\n| \\[XYZ\\]TICKFONT\\_SIZE    | The axis text size in points.                                                                                                                                                                                                                                                                                                                                                                                          |\n| \\[XYZ\\]TICKFONT\\_STYLE   | A string or integer containing the font style: normal (0), **bold** (1), _italic_ (2), or **bold italic** (3).                                                                                                                                                                                                                                                                                                         |\n| \\[XYZ\\]TICKFORMAT        | A string or string array of tick label formats. See [Format Codes](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Creating%20IDL%20Programs/Components%20of%20the%20IDL%20Language/Format%255FCodes%255FFortran.htm%22%7D) for more information.                                                                                                                                                                                                                                      |\n| \\[XYZ\\]TICKINTERVAL      | The interval between major tick marks.                                                                                                                                                                                                                                                                                                                                                                                 |\n| \\[XYZ\\]TICKLAYOUT        | Set to 1 to suppress tick marks; set to 2 to draw a box around the tick labels.                                                                                                                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TICKLEN           | The length of each major tick mark, normalized to the width or height of the graphic. The default value is automatically calculated based upon the aspect ratio of the graphic.                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TICKNAME          | A string array containing the tick labels.                                                                                                                                                                                                                                                                                                                                                                             |\n| \\[XYZ\\]TICKUNITS         | A string giving the tick units. Valid values are: null (the default, signified by empty quotes), Years, Months, Days, Hours, Minutes, Seconds, Time, exponent for exponential notation, or scientific for scientific notation. If any of the time units are utilized, then the tick values are interpreted as Julian date/time values. If more than one unit is provided, the axis will be drawn with multiple levels. |\n| \\[XYZ\\]TICKVALUES        | An array of tick mark locations.                                                                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]TITLE             | A string giving the axis title.                                                                                                                                                                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TRANSPARENCY      | An integer from 0-100 giving the percent transparency.                                                                                                                                                                                                                                                                                                                                                                 |\n\nFor more detailed explanations of these properties, see the [AXIS](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/A/AXIS.htm%22%7D) function.\n\n_Tip:_ You can also use the [AXIS](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/A/AXIS.htm%22%7D) function to insert additional axes after the graphic has been created.',
        },
      },
      {
        label: 'background_color',
        insertText: 'background_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) indicating the graphic's background color. The default value is \\[255, 255, 255\\] (white). Set this property to a scalar value to remove the background color.\n\n_Tip:_ To set the background color of the entire window, retrieve the window object using the WINDOW property, and set the BACKGROUND\\_COLOR on the window object.",
        },
      },
      {
        label: 'background_transparency',
        insertText: 'background_transparency',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an integer between 0 and 100 giving the percent transparency of the background color. The default is 100 (completely transparent).\n\n_Note:_ If the BACKGROUND\\_COLOR property is changed, and the current background transparency is 100, then the BACKGROUND\\_TRANSPARENCY will be automatically set to 0 (opaque) so that you can see the new color.',
        },
      },
      {
        label: 'buffer',
        insertText: 'buffer',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to 1 to direct the graphics to an off-screen buffer instead of creating a window.',
        },
      },
      {
        label: 'clip',
        insertText: 'clip',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to clip portions of the graphic that lie outside of the dataspace range, or to 0 to disable clipping. The default is 1.',
        },
      },
      {
        label: 'color',
        insertText: 'color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the plot line.\n\n_Note:_ When you retrieve the COLOR property, the returned value will always be a three-element RGB vector, regardless of how the color was initially specified.',
        },
      },
      {
        label: 'crosshair',
        insertText: 'crosshair',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Use this property to retrieve a reference to the Crosshair graphic. All graphics objects within the same set of axes share a single Crosshair graphic. For Plot graphics the default behavior is to display the crosshair when a Mouse\\_Down event is received. For other graphics the crosshair is disabled. The STYLE property may be used to automatically draw the crosshair, while the LOCATION property may be used to manually draw the crosshair.\n\nYou can get and set the following properties on the retrieved crosshair:\n\n| Property     | Description                                                                                                                                                                                                                                                                                                                                                                               |\n| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| ANTIALIAS    | Set to 1 to enable anti-aliasing for the lines.                                                                                                                                                                                                                                                                                                                                           |\n| COLOR        | A string or RGB vector containing the color.                                                                                                                                                                                                                                                                                                                                              |\n| HIDE         | Set to 1 to hide the crosshair, 0 to show.                                                                                                                                                                                                                                                                                                                                                |\n| INTERPOLATE  | Set to 1 to force interpolation between Plot data points when SNAP is active. For other graphics this property is ignored. The default is 0.                                                                                                                                                                                                                                              |\n| LINESTYLE    | An integer or string giving the line style. The default is \'dot\'. See [Linestyle Values](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#LinestyleValues%22%7D) for additional options.                                                                                                                                                                                                           |\n| LOCATION     | The location at which to draw the crosshair. For Plot graphics, if SNAP is enabled, then only the X coordinate needs to be supplied. Otherwise, LOCATION should be set to a two-element vector \\[X, Y\\] for two-dimensional graphics or \\[X, Y, Z\\] for three-dimensional graphics. If STYLE is currently "None", then setting the LOCATION will automatically set the STYLE to "Manual". |\n| NAME         | The name of the graphic.                                                                                                                                                                                                                                                                                                                                                                  |\n| SNAP         | Set to 1 to snap the crosshair to the nearest Plot data point. For other graphics this property is ignored. The default is 1.                                                                                                                                                                                                                                                             |\n| STYLE        | An integer or string giving the crosshair style. Possible values are: 0 - "None" - never draw the crosshair. This is the default for all graphics except 2D plots. 1 - "Manual" - draw the crosshair using the LOCATION property. 2 - "Auto" - automatically draw the crosshair. This is the default for 2D plots.                                                                        |\n| THICK        | The thickness of the lines. The default is 1.                                                                                                                                                                                                                                                                                                                                             |\n| TRANSPARENCY | The percent transparency of the lines. The default is 50.                                                                                                                                                                                                                                                                                                                                 |\n| UVALUE       | An IDL variable of any data type.                                                                                                                                                                                                                                                                                                                                                         |\n\nFor example, use the CROSSHAIR property to draw a crosshair on an image:\n\n```idl\n  im = image(/test, transparency = 50, axis_style = 2)\n  c = im.crosshair\n  c.color = \'red\'\n  c.thick = 2\n  c.location = [300, 200]\n```\n\nSee [Creating Functions to Control Mouse Events](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/GuideMe/MouseEventFunctions.htm%22%7D) for a more detailed crosshair example.',
        },
      },
      {
        label: 'current',
        insertText: 'current',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this keyword to create the graphic in the current window with a new set of axes. If no window exists, a new window is created. The WINDOW's [SetCurrent](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/SetCurrent%20Method.htm%22%7D) method may be used to set the current window.\n\nOr, set this keyword to an existing IDL Graphic reference to make that window be the current window and direct the new graphic to that window.\n\n_Tip:_ The CURRENT keyword is usually used with the LAYOUT keyword or POSITION property to produce a window which has multiple graphics in different locations.\n\n_Tip:_ For the graphic share the _same_ axes as an existing graphic, use the OVERPLOT keyword instead.",
        },
      },
      {
        label: 'device',
        insertText: 'device',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword if values are specified in device coordinates (pixels) for the MARGIN and POSITION keywords. (Normalized coordinates are the default for these keywords.)',
        },
      },
      {
        label: 'dimensions',
        insertText: 'dimensions',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to a two-element vector of the form \\[_width_, _height_\\] to specify the window dimensions in pixels. If you do not specify a value for DIMENSIONS, IDL by default uses the values of the IDL\\_GR\\_WIN\\_HEIGHT and IDL\\_GR\\_WIN\\_WIDTH preferences for Windows platforms or the IDL\\_GR\\_X\\_HEIGHT and IDL\\_GR\\_X\\_WIDTH preferences for X Windows systems on UNIX.\n\n_Tip:_ The minimum _width_ is set by the toolbar in the window, usually around 400 pixels. To create a smaller graphics window, use the NO\\_TOOLBAR keyword.',
        },
      },
      {
        label: 'eqn_samples',
        insertText: 'eqn_samples',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an integer giving the number of samples to use with the EQUATION property. A higher value will give a smoother plot but will be slower to compute. The default is 1000 points. This property has no effect if EQUATION is not set.',
        },
      },
      {
        label: 'eqn_userdata',
        insertText: 'eqn_userdata',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an expression containing data of any type. If EQUATION is set to a function, and EQN\\_USERDATA is set, then the value of EQN\\_USERDATA will be passed in as the second argument to the function. If EQUATION is not set, or if EQUATION is set to an expression of _X_, then this property will have no effect.',
        },
      },
      {
        label: 'equation',
        insertText: 'equation',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a string that contains an equation. The equation can either be a valid IDL statement that has a variable named "_x_", or the name of a function that accepts a single argument, _X_. Note that your IDL statement (or function) must be able to handle an array of X values. In other words, all of the X values are passed in at once in a vector, not individually. The result of evaluating the equation with _X_ should be another one-dimensional array containing the data to be plotted.\n\n* When the plot is displayed, IDL will automatically construct a one-dimensional array _X_ that spans the current axis range.\n* The initial range is \\[-10, 10\\].\n* If EQUATION is an expression, then IDL calls the [EXECUTE](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/E/EXECUTE.htm%22%7D) function once with the X array. Note that in certain circumstances (such as the IDL Virtual Machine), you may not be able to use the EXECUTE function.\n* If EQUATION is a function name, then IDL runs [CALL\\_FUNCTION](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/C/CALL%255FFUNCTION.htm%22%7D) once, with the _X_ array as the input argument. The function should return a one-dimensional result array.\n* Once the equation is evaluated, IDL examines the result for any NaN values and the _X_ range is clipped to only cover the valid region.\n* The equation should be a "single" IDL statement (the "&" can not be used). If you need multiple statements, you should construct a function that accepts one argument, _X_, and put all of your code within the function.\n* If you change the _X_ axis range (either by using the mouse to pan around or using the XRANGE property), then a new set of _X_ values is constructed and IDL calls your equation again with the new values.\n* You can use EQN\\_SAMPLES to control the number of sampled points.\n* You can use EQN\\_USERDATA to pass in user-defined data to your function.\n\n#### Example of EQUATION Property with an Expression\n\nThe following code will produce a plot with a given equation:\n\n```idl\n  p = plot(\'SMOOTH(sin(1/x),9)\', xrange = [0.01, 0.2], $\n    /fill_background, fill_level = 0)\n```\n\n#### Example of EQUATION Property with a Function\n\nTo use the EQUATION property with a function, first create the function and save it into a file named `ex_plotequation.pro` somewhere on IDL\'s current path:\n\n```idl\n  function ex_plotequation, x\n    compile_opt idl2\n    data = smooth(sin(1 / x), 9)\n    RETURN, data\n  end\n```\n\nThen run the following code to use the equation:\n\n```idl\n  p = plot(\'ex_plotequation\', xrange = [0.01, 0.2], $\n    /fill_background, fill_level = 0)\n```\n\nFor a more detailed example see [Dynamic Visualizations](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/GuideMe/LongExamples/DynamicVisualizations/DynamicVis%255FSplash.htm%22%7D).',
        },
      },
      {
        label: 'fill_background',
        insertText: 'fill_background',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value: 'A value of 1 fills the area under the plot.',
        },
      },
      {
        label: 'fill_color',
        insertText: 'fill_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the filled area. The default value is \\[128,128,128\\] (gray). This property is ignored if FILL\\_BACKGROUND is not set.',
        },
      },
      {
        label: 'fill_level',
        insertText: 'fill_level',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value specifying the Y value for a boundary of the fill region. This property is ignored if FILL\\_BACKGROUND is not set.',
        },
      },
      {
        label: 'fill_transparency',
        insertText: 'fill_transparency',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'An integer between 0 and 100 that specifies the percent transparency of the background fill. This property is ignored if FILL\\_BACKGROUND is not set.',
        },
      },
      {
        label: 'font_color',
        insertText: 'font_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the text color of the title and axes (if present). The default value is "black".',
        },
      },
      {
        label: 'font_name',
        insertText: 'font_name',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property equal to a string specifying the IDL or system font for the title and axes (if present). The default value is "DejaVuSans".',
        },
      },
      {
        label: 'font_size',
        insertText: 'font_size',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property equal to an integer specifying the font size for the title and axes (if present). The default value is 9 points for the axis text and 11 points for the title.',
        },
      },
      {
        label: 'font_style',
        insertText: 'font_style',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property equal to an integer or a string specifying the font style for the title and axes (if present). Allowed values are:\n\n| Integer | String                | Resulting Style |\n| ------- | --------------------- | --------------- |\n| 0       | "Normal" or "rm"      | Default (roman) |\n| 1       | "Bold" or "bf"        | Bold            |\n| 2       | "Italic" or "it"      | Italic          |\n| 3       | "Bold italic" or "bi" | Bold italic     |',
        },
      },
      {
        label: 'hide',
        insertText: 'hide',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to hide the graphic. Set HIDE to 0 to show the graphic.',
        },
      },
      {
        label: 'histogram',
        insertText: 'histogram',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to connect each point with horizontal and vertical lines. The horizontal lines start at the X location of each point and extend to the next X location. This property is useful for displaying information with discrete or non-linear data, where the X values are typically non-integer bin locations and the Y values represent the "count" of values within each bin. See the STAIRSTEP property for centered bars.\n\n_Tip:_ You can also use the [BARPLOT](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/B/BARPLOT.htm%22%7D) function to create a plot with vertical or horizontal bars.',
        },
      },
      {
        label: 'layout',
        insertText: 'layout',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to a three-element vector \\[_ncol_, _nrow_, _index_\\] that arranges graphics in a grid. The first dimension _ncol_ is the number of columns in the grid, _nrow_ is the number of rows, and _index_ is the grid position at which to place the graphic (starting at element 1). This keyword is ignored if either OVERPLOT or POSITION is specified.',
        },
      },
      {
        label: 'linestyle',
        insertText: 'linestyle',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this property to an integer or string giving the line style for the plot.\n\nThe following table lists the index values, strings, and characters you can use with the LINESTYLE property, and the equivalent characters and strings you can use in the _Format_ string argument.\n\n| Index | LINESTYLE Property                     | Format Argument             | Description      |\n| ----- | -------------------------------------- | --------------------------- | ---------------- |\n| 0     | 'solid\\_line', '-'(dash)               | '-' (dash)                  | solid line       |\n| 1     | 'dot', ':'(colon)                      | ':'(colon)                  | dotted           |\n| 2     | 'dash', '--' (double dashes)           | '--' (double dashes)        | dashed           |\n| 3     | 'dash\\_dot', '-.'                      | '-.'                        | dash dot         |\n| 4     | 'dash\\_dot\\_dot\\_dot', '-:'            | '-:'                        | dash dot dot dot |\n| 5     | 'long\\_dash', '\\_\\_' (two underscores) | '\\_\\_' (double underscores) | long dash        |\n| 6     | 'none', ' ' (space)                    | ' ' (space)                 | no line          |\n\n_Note:_ If you use the LINESTYLE value or _Format_ string '-.', the linestyle is set to dash-dot and the plot symbol is not set.\n\n_Note:_ You can also set LINESTYLE to a two-element vector, \\[_repeat_, _bitmask_\\], specifying a stippling pattern. The _repeat_ indicates the number of times that individual bits in the _bitmask_ should be repeated. (That is, if three consecutive 0’s appear in the _bitmask_ and the value of _repeat_ is 2, then the line that is drawn will have six consecutive bits turned off.) The value of _repeat_ must be an integer between 1 and 255\\. The _bitmask_ indicates which pixels are drawn and which are not along the length of the line. The _bitmask_ should be specified as a 16-bit hexadecimal value. For example, LINESTYLE = \\[2, 'F0F0'X\\] describes a dashed line (8 bits on, 8 bits off, 8 bits on, 8 bits off).",
        },
      },
      {
        label: 'location',
        insertText: 'location',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this keyword to a two-element vector \\[_X offset_, _Y offset_\\] giving the window's screen offset in pixels.",
        },
      },
      {
        label: 'map_projection',
        insertText: 'map_projection',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the name of the current map projection. After creation, use this property to retrieve or set the current map projection.',
        },
      },
      {
        label: 'mapgrid',
        insertText: 'mapgrid',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'If a map projection is currently in effect, this property retrieves a reference to the [MAPGRID](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/M/MAPGRID.htm%22%7D) object.',
        },
      },
      {
        label: 'mapprojection',
        insertText: 'mapprojection',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'If a map projection is currently in effect, this property retrieves a reference to the [MAPPROJECTION](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/M/MAP.htm%22%7D) object.',
        },
      },
      {
        label: 'margin',
        insertText: 'margin',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to the current graphic’s margin values in the layout specified by the LAYOUT property. Use a scalar value to set the same margin on all sides, or use a four-element vector \\[_left_, _bottom_, _right_, _top_\\] to specify different margins on each side.\n\nBy default, margin values are expressed in normalized units ranging from 0.0 to 0.5\\. If the DEVICE keyword is set, the values are given in device units (pixels).\n\nThis keyword is ignored if either OVERPLOT or POSITION is specified.',
        },
      },
      {
        label: 'max_value',
        insertText: 'max_value',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'The maximum value to be plotted. If this property is set, data values greater than the value of MAX\\_VALUE are treated as missing data and are not plotted.\n\n_Note:_ The IEEE floating point value NaN is also treated as missing data.',
        },
      },
      {
        label: 'min_value',
        insertText: 'min_value',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'The minimum value to be plotted. If this property is set, data values less than the value of MIN\\_VALUE are treated as missing data and are not plotted.\n\n_Note:_ The IEEE floating point value NaN is also treated as missing data.',
        },
      },
      {
        label: 'name',
        insertText: 'name',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A string that specifies the name of the graphic. The name can be used to retrieve the graphic using the brackets array notation. If NAME is not set then a default name is chosen based on the graphic type.',
        },
      },
      {
        label: 'no_toolbar',
        insertText: 'no_toolbar',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "By default the graphics window will have a toolbar containing some common tools such as Print and Save. Set this keyword to remove the toolbar. This keyword has no effect if the window is already created.\n\n_Tip:_ When the toolbar exists, the minimum window _width_ is set to the toolbar's width, usually around 400 pixels. To create a smaller graphics window, use the NO\\_TOOLBAR keyword.",
        },
      },
      {
        label: 'nodata',
        insertText: 'nodata',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to 1 to create the graphic, but without any data attached to it. The axes and title (if present) are also created and displayed. If the OVERPLOT keyword is specified, axis ranges will not change.\n\n_Note:_ You must still provide valid input arguments. The data range of the input arguments are used to automatically set the range of the axes. The \\[XYZ\\]RANGE properties may be used to override these default ranges.',
        },
      },
      {
        label: 'overplot',
        insertText: 'overplot',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this keyword to 1 (one) to place the graphic on top of the currently-selected graphic within the current window. The two graphics items will then share the same set of axes. If no current window exists, then this keyword is ignored and a new window is created.\n\nIf you have a graphic in another window that is not currently selected, you can also set this keyword to that graphic's reference to overplot on top of that graphic.\n\n_Tip:_ For the graphic to have a _new_ set of axes, use the CURRENT keyword instead.",
        },
      },
      {
        label: 'position',
        insertText: 'position',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a four-element vector that determines the position of the graphic within the window. The coordinates \\[X1, Y1, X2, Y2\\] define the lower left and upper right corners of the graphic. Coordinates are expressed in normalized units ranging from 0.0 to 1.0\\. On creation, if the DEVICE keyword is set, the units are given in device units (pixels).\n\n_Note:_ After creation, you can set the POSITION to either a two or four-element vector. If two elements are provided, the center of the graphic will be translated to that position. If four elements are provided, the graphics will be translated and scaled to fit the position.',
        },
      },
      {
        label: 'rgb_table',
        insertText: 'rgb_table',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'The number of the [predefined IDL color table](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/LoadingDefaultColorTables.htm%22%7D), or a 3 x 256 or 256 x 3 byte array containing color values to use for vertex colors. If the values supplied are not of type byte, they are scaled to the byte range using BYTSCL. Use the VERT\\_COLORS property to specify indices that select colors from the values specified with RGB\\_TABLE.',
        },
      },
      {
        label: 'stairstep',
        insertText: 'stairstep',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to connect each point with horizontal and vertical lines. The horizontal lines are centered at each X location. This property is useful for displaying information with discrete or non-linear data, where the X values are typically integers and the Y values represent the "count" at that X location. See the HISTOGRAM property for bars that span X values.\n\n_Tip:_ You can also use the [BARPLOT](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/B/BARPLOT.htm%22%7D) function to create a plot with vertical or horizontal bars.',
        },
      },
      {
        label: 'sym_color',
        insertText: 'sym_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the plot symbol. If this property is not set then the symbol color will match the COLOR.',
        },
      },
      {
        label: 'sym_fill_color',
        insertText: 'sym_fill_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the filled portion of the symbol. If this property is not set then the symbol fill color will match the SYM\\_COLOR.',
        },
      },
      {
        label: 'sym_filled',
        insertText: 'sym_filled',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value: 'Set this property to 1 to fill the symbols.',
        },
      },
      {
        label: 'sym_increment',
        insertText: 'sym_increment',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an integer value specifying the number of plot vertices between symbols. The default value is 1, which places a symbol on every vertex.',
        },
      },
      {
        label: 'sym_object',
        insertText: 'sym_object',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            ' Set this property equal to an object reference to be used for the plotting symbol. The SYM\\_OBJECT may be either an IDLgrModel object or an atomic graphics object. \n\n_Note:_ When using custom plotting symbols, note that the SYM\\_OBJECT property takes precedence over the SYMBOL property. In other words, if you set a custom symbol using SYM\\_OBJECT, then try to change that symbol using the SYMBOL property, IDL ignores the new SYMBOL property and retains SYM\\_OBJECT.',
        },
      },
      {
        label: 'sym_size',
        insertText: 'sym_size',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value specifying the size of the plot symbol. A value of 1.0 produces a symbol that is 10% of the width/height of the plot.',
        },
      },
      {
        label: 'sym_thick',
        insertText: 'sym_thick',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value from 1.0 to 10.0 that specifies the thickness (in points) of the plot symbol.',
        },
      },
      {
        label: 'sym_transparency',
        insertText: 'sym_transparency',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'An integer between 0 and 100 that specifies the percent transparency of the symbols. The default value is 0.',
        },
      },
    ];

    // verify results
    expect(expectedFound_3).toEqual(
      (
        await index.getAutoComplete(
          filepath,
          await readFile(filepath, 'utf-8'),
          position_3
        )
      ).slice(0, 50)
    );
    // define position
    const position_4: Position = { line: 24, character: 11 };

    // define expected token we extract
    const expectedFound_4: CompletionItem[] = [
      {
        label: 'antialias',
        insertText: 'antialias',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'By default anti-aliasing is used when drawing lines. Set this property to 0 to disable anti-aliasing.',
        },
      },
      {
        label: 'aspect_ratio',
        insertText: 'aspect_ratio',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value indicating the ratio of the Y dimension to the X dimension in data units. If this property is set to a nonzero value, the aspect ratio will be preserved as the graphic is stretched or shrunk. The default value is 0 for all graphics except images, meaning that the aspect ratio is not fixed, but is allowed to change as the graphic is stretched or shrunk.',
        },
      },
      {
        label: 'axes',
        insertText: 'axes',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "This property retrieves an array that contains all of the AXIS objects within the visualization. For example, for a plot visualization:\n\n```idl\n  p = plot(/test)\n  ax = p.axes\n  ax[0].title = 'X axis'\n  ax[1].title = 'Y axis'\n  ax[2].hide = 1 ; hide top X axis\n  ax[3].hide = 1 ; hide right Y axis\n```\n\nSee [AXIS](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/A/AXIS.htm%22%7D) for a list of the available properties.",
        },
      },
      {
        label: 'axis_style',
        insertText: 'axis_style',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to one of the following values:\n\n* 0 - No axes. Decrease the margins so the graphic almost fills the window. This is the default for images.\n* 1 - Single X, Y (and Z if 3D) axes located at the minimum data value. The margins will be adjusted to leave space for the axes. This is the default for 3D graphics.\n* 2 - Box axes - multiple axes located at both the minimum and maximum data values. The margins will be adjusted to leave space for the axes. This is the default for 2D graphics.\n* 3 - Crosshair-style axes - located at the midpoint of each data dimension. Since the axes are in the middle, decrease the margins so the graphic almost fills the window. This is the default for polar plots.\n* 4 - No axes, but use the same margins as if axes were there. This is useful if you want to later add another graphic that does have axes, and you want the two visualizations to be aligned properly.\n\nYou can set the following properties on the axes:\n\n| Property                 | Description                                                                                                                                                                                                                                                                                                                                                                                                            |\n| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| \\[XYZ\\]COLOR             | A string or RGB vector containing the axis color.                                                                                                                                                                                                                                                                                                                                                                      |\n| \\[XYZ\\]GRIDSTYLE         | A string, integer, or 2-element vector giving the linestyle for tickmarks.                                                                                                                                                                                                                                                                                                                                             |\n| \\[XYZ\\]LOG               | Set to 1 if the axis is logarithmic. The minimum value of the axis range must be greater than zero.                                                                                                                                                                                                                                                                                                                    |\n| \\[XYZ\\]MAJOR             | The number of major tick marks. Set to -1 to auto-compute, set to 0 to suppress.                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]MINOR             | The number of minor tick marks. Set to -1 to auto-compute, set to 0 to suppress.                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]SUBGRIDSTYLE      | A string, integer, or 2-element vector giving the linestyle for the minor tickmarks. The default is 0, for solid lines. Set to -1 to force minor ticks to have the same linestyle as major ticks.                                                                                                                                                                                                                      |\n| \\[XYZ\\]SHOWTEXT          | Set to 1 to show text labels or 0 to hide the text labels.                                                                                                                                                                                                                                                                                                                                                             |\n| \\[XYZ\\]STYLE             | The axis range style. The valid values are: (0) Nice range. Default for all graphics except Image, Barplot, and Map. (1) Force the exact data range. Default for Image, Barplot, and Map. (2) Pad the axes slightly beyond the nice range. (3) Pad the axes slightly beyond the exact data range. The \\[XYZ\\]RANGE takes precedence over this property.                                                                |\n| \\[XYZ\\]SUBTICKLEN        | The ratio of the minor tick length to the major tick length. The default is 0.5.                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]TEXT\\_COLOR       | A string or RGB vector containing the axis text color.                                                                                                                                                                                                                                                                                                                                                                 |\n| \\[XYZ\\]TEXT\\_ORIENTATION | The angle (in degrees) of the tick mark labels.                                                                                                                                                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TEXTPOS           | Set to 1 to position text above the axis. The default is 0, below the axis.                                                                                                                                                                                                                                                                                                                                            |\n| \\[XYZ\\]THICK             | Set to a floating-point value between 0 and 10 to specify the line thickness for tickmarks. A thickness of 0 gives a thin hairline. The default is 1.                                                                                                                                                                                                                                                                  |\n| \\[XYZ\\]TICKDIR           | Set to 1 to draw the tickmarks facing outwards. The default is 0, facing inwards.                                                                                                                                                                                                                                                                                                                                      |\n| \\[XYZ\\]TICKFONT\\_NAME    | A string containing the font name for the axis text.                                                                                                                                                                                                                                                                                                                                                                   |\n| \\[XYZ\\]TICKFONT\\_SIZE    | The axis text size in points.                                                                                                                                                                                                                                                                                                                                                                                          |\n| \\[XYZ\\]TICKFONT\\_STYLE   | A string or integer containing the font style: normal (0), **bold** (1), _italic_ (2), or **bold italic** (3).                                                                                                                                                                                                                                                                                                         |\n| \\[XYZ\\]TICKFORMAT        | A string or string array of tick label formats. See [Format Codes](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Creating%20IDL%20Programs/Components%20of%20the%20IDL%20Language/Format%255FCodes%255FFortran.htm%22%7D) for more information.                                                                                                                                                                                                                                      |\n| \\[XYZ\\]TICKINTERVAL      | The interval between major tick marks.                                                                                                                                                                                                                                                                                                                                                                                 |\n| \\[XYZ\\]TICKLAYOUT        | Set to 1 to suppress tick marks; set to 2 to draw a box around the tick labels.                                                                                                                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TICKLEN           | The length of each major tick mark, normalized to the width or height of the graphic. The default value is automatically calculated based upon the aspect ratio of the graphic.                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TICKNAME          | A string array containing the tick labels.                                                                                                                                                                                                                                                                                                                                                                             |\n| \\[XYZ\\]TICKUNITS         | A string giving the tick units. Valid values are: null (the default, signified by empty quotes), Years, Months, Days, Hours, Minutes, Seconds, Time, exponent for exponential notation, or scientific for scientific notation. If any of the time units are utilized, then the tick values are interpreted as Julian date/time values. If more than one unit is provided, the axis will be drawn with multiple levels. |\n| \\[XYZ\\]TICKVALUES        | An array of tick mark locations.                                                                                                                                                                                                                                                                                                                                                                                       |\n| \\[XYZ\\]TITLE             | A string giving the axis title.                                                                                                                                                                                                                                                                                                                                                                                        |\n| \\[XYZ\\]TRANSPARENCY      | An integer from 0-100 giving the percent transparency.                                                                                                                                                                                                                                                                                                                                                                 |\n\nFor more detailed explanations of these properties, see the [AXIS](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/A/AXIS.htm%22%7D) function.\n\n_Tip:_ You can also use the [AXIS](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/A/AXIS.htm%22%7D) function to insert additional axes after the graphic has been created.',
        },
      },
      {
        label: 'background_color',
        insertText: 'background_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) indicating the graphic's background color. The default value is \\[255, 255, 255\\] (white). Set this property to a scalar value to remove the background color.\n\n_Tip:_ To set the background color of the entire window, retrieve the window object using the WINDOW property, and set the BACKGROUND\\_COLOR on the window object.",
        },
      },
      {
        label: 'background_transparency',
        insertText: 'background_transparency',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an integer between 0 and 100 giving the percent transparency of the background color. The default is 100 (completely transparent).\n\n_Note:_ If the BACKGROUND\\_COLOR property is changed, and the current background transparency is 100, then the BACKGROUND\\_TRANSPARENCY will be automatically set to 0 (opaque) so that you can see the new color.',
        },
      },
      {
        label: 'buffer',
        insertText: 'buffer',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to 1 to direct the graphics to an off-screen buffer instead of creating a window.',
        },
      },
      {
        label: 'clip',
        insertText: 'clip',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to clip portions of the graphic that lie outside of the dataspace range, or to 0 to disable clipping. The default is 1.',
        },
      },
      {
        label: 'color',
        insertText: 'color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the plot line.\n\n_Note:_ When you retrieve the COLOR property, the returned value will always be a three-element RGB vector, regardless of how the color was initially specified.',
        },
      },
      {
        label: 'crosshair',
        insertText: 'crosshair',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Use this property to retrieve a reference to the Crosshair graphic. All graphics objects within the same set of axes share a single Crosshair graphic. For Plot graphics the default behavior is to display the crosshair when a Mouse\\_Down event is received. For other graphics the crosshair is disabled. The STYLE property may be used to automatically draw the crosshair, while the LOCATION property may be used to manually draw the crosshair.\n\nYou can get and set the following properties on the retrieved crosshair:\n\n| Property     | Description                                                                                                                                                                                                                                                                                                                                                                               |\n| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| ANTIALIAS    | Set to 1 to enable anti-aliasing for the lines.                                                                                                                                                                                                                                                                                                                                           |\n| COLOR        | A string or RGB vector containing the color.                                                                                                                                                                                                                                                                                                                                              |\n| HIDE         | Set to 1 to hide the crosshair, 0 to show.                                                                                                                                                                                                                                                                                                                                                |\n| INTERPOLATE  | Set to 1 to force interpolation between Plot data points when SNAP is active. For other graphics this property is ignored. The default is 0.                                                                                                                                                                                                                                              |\n| LINESTYLE    | An integer or string giving the line style. The default is \'dot\'. See [Linestyle Values](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#LinestyleValues%22%7D) for additional options.                                                                                                                                                                                                           |\n| LOCATION     | The location at which to draw the crosshair. For Plot graphics, if SNAP is enabled, then only the X coordinate needs to be supplied. Otherwise, LOCATION should be set to a two-element vector \\[X, Y\\] for two-dimensional graphics or \\[X, Y, Z\\] for three-dimensional graphics. If STYLE is currently "None", then setting the LOCATION will automatically set the STYLE to "Manual". |\n| NAME         | The name of the graphic.                                                                                                                                                                                                                                                                                                                                                                  |\n| SNAP         | Set to 1 to snap the crosshair to the nearest Plot data point. For other graphics this property is ignored. The default is 1.                                                                                                                                                                                                                                                             |\n| STYLE        | An integer or string giving the crosshair style. Possible values are: 0 - "None" - never draw the crosshair. This is the default for all graphics except 2D plots. 1 - "Manual" - draw the crosshair using the LOCATION property. 2 - "Auto" - automatically draw the crosshair. This is the default for 2D plots.                                                                        |\n| THICK        | The thickness of the lines. The default is 1.                                                                                                                                                                                                                                                                                                                                             |\n| TRANSPARENCY | The percent transparency of the lines. The default is 50.                                                                                                                                                                                                                                                                                                                                 |\n| UVALUE       | An IDL variable of any data type.                                                                                                                                                                                                                                                                                                                                                         |\n\nFor example, use the CROSSHAIR property to draw a crosshair on an image:\n\n```idl\n  im = image(/test, transparency = 50, axis_style = 2)\n  c = im.crosshair\n  c.color = \'red\'\n  c.thick = 2\n  c.location = [300, 200]\n```\n\nSee [Creating Functions to Control Mouse Events](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/GuideMe/MouseEventFunctions.htm%22%7D) for a more detailed crosshair example.',
        },
      },
      {
        label: 'current',
        insertText: 'current',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this keyword to create the graphic in the current window with a new set of axes. If no window exists, a new window is created. The WINDOW's [SetCurrent](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/SetCurrent%20Method.htm%22%7D) method may be used to set the current window.\n\nOr, set this keyword to an existing IDL Graphic reference to make that window be the current window and direct the new graphic to that window.\n\n_Tip:_ The CURRENT keyword is usually used with the LAYOUT keyword or POSITION property to produce a window which has multiple graphics in different locations.\n\n_Tip:_ For the graphic share the _same_ axes as an existing graphic, use the OVERPLOT keyword instead.",
        },
      },
      {
        label: 'device',
        insertText: 'device',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword if values are specified in device coordinates (pixels) for the MARGIN and POSITION keywords. (Normalized coordinates are the default for these keywords.)',
        },
      },
      {
        label: 'dimensions',
        insertText: 'dimensions',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to a two-element vector of the form \\[_width_, _height_\\] to specify the window dimensions in pixels. If you do not specify a value for DIMENSIONS, IDL by default uses the values of the IDL\\_GR\\_WIN\\_HEIGHT and IDL\\_GR\\_WIN\\_WIDTH preferences for Windows platforms or the IDL\\_GR\\_X\\_HEIGHT and IDL\\_GR\\_X\\_WIDTH preferences for X Windows systems on UNIX.\n\n_Tip:_ The minimum _width_ is set by the toolbar in the window, usually around 400 pixels. To create a smaller graphics window, use the NO\\_TOOLBAR keyword.',
        },
      },
      {
        label: 'eqn_samples',
        insertText: 'eqn_samples',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an integer giving the number of samples to use with the EQUATION property. A higher value will give a smoother plot but will be slower to compute. The default is 1000 points. This property has no effect if EQUATION is not set.',
        },
      },
      {
        label: 'eqn_userdata',
        insertText: 'eqn_userdata',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an expression containing data of any type. If EQUATION is set to a function, and EQN\\_USERDATA is set, then the value of EQN\\_USERDATA will be passed in as the second argument to the function. If EQUATION is not set, or if EQUATION is set to an expression of _X_, then this property will have no effect.',
        },
      },
      {
        label: 'equation',
        insertText: 'equation',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a string that contains an equation. The equation can either be a valid IDL statement that has a variable named "_x_", or the name of a function that accepts a single argument, _X_. Note that your IDL statement (or function) must be able to handle an array of X values. In other words, all of the X values are passed in at once in a vector, not individually. The result of evaluating the equation with _X_ should be another one-dimensional array containing the data to be plotted.\n\n* When the plot is displayed, IDL will automatically construct a one-dimensional array _X_ that spans the current axis range.\n* The initial range is \\[-10, 10\\].\n* If EQUATION is an expression, then IDL calls the [EXECUTE](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/E/EXECUTE.htm%22%7D) function once with the X array. Note that in certain circumstances (such as the IDL Virtual Machine), you may not be able to use the EXECUTE function.\n* If EQUATION is a function name, then IDL runs [CALL\\_FUNCTION](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/C/CALL%255FFUNCTION.htm%22%7D) once, with the _X_ array as the input argument. The function should return a one-dimensional result array.\n* Once the equation is evaluated, IDL examines the result for any NaN values and the _X_ range is clipped to only cover the valid region.\n* The equation should be a "single" IDL statement (the "&" can not be used). If you need multiple statements, you should construct a function that accepts one argument, _X_, and put all of your code within the function.\n* If you change the _X_ axis range (either by using the mouse to pan around or using the XRANGE property), then a new set of _X_ values is constructed and IDL calls your equation again with the new values.\n* You can use EQN\\_SAMPLES to control the number of sampled points.\n* You can use EQN\\_USERDATA to pass in user-defined data to your function.\n\n#### Example of EQUATION Property with an Expression\n\nThe following code will produce a plot with a given equation:\n\n```idl\n  p = plot(\'SMOOTH(sin(1/x),9)\', xrange = [0.01, 0.2], $\n    /fill_background, fill_level = 0)\n```\n\n#### Example of EQUATION Property with a Function\n\nTo use the EQUATION property with a function, first create the function and save it into a file named `ex_plotequation.pro` somewhere on IDL\'s current path:\n\n```idl\n  function ex_plotequation, x\n    compile_opt idl2\n    data = smooth(sin(1 / x), 9)\n    RETURN, data\n  end\n```\n\nThen run the following code to use the equation:\n\n```idl\n  p = plot(\'ex_plotequation\', xrange = [0.01, 0.2], $\n    /fill_background, fill_level = 0)\n```\n\nFor a more detailed example see [Dynamic Visualizations](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/GuideMe/LongExamples/DynamicVisualizations/DynamicVis%255FSplash.htm%22%7D).',
        },
      },
      {
        label: 'fill_background',
        insertText: 'fill_background',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value: 'A value of 1 fills the area under the plot.',
        },
      },
      {
        label: 'fill_color',
        insertText: 'fill_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the filled area. The default value is \\[128,128,128\\] (gray). This property is ignored if FILL\\_BACKGROUND is not set.',
        },
      },
      {
        label: 'fill_level',
        insertText: 'fill_level',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value specifying the Y value for a boundary of the fill region. This property is ignored if FILL\\_BACKGROUND is not set.',
        },
      },
      {
        label: 'fill_transparency',
        insertText: 'fill_transparency',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'An integer between 0 and 100 that specifies the percent transparency of the background fill. This property is ignored if FILL\\_BACKGROUND is not set.',
        },
      },
      {
        label: 'font_color',
        insertText: 'font_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the text color of the title and axes (if present). The default value is "black".',
        },
      },
      {
        label: 'font_name',
        insertText: 'font_name',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property equal to a string specifying the IDL or system font for the title and axes (if present). The default value is "DejaVuSans".',
        },
      },
      {
        label: 'font_size',
        insertText: 'font_size',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property equal to an integer specifying the font size for the title and axes (if present). The default value is 9 points for the axis text and 11 points for the title.',
        },
      },
      {
        label: 'font_style',
        insertText: 'font_style',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property equal to an integer or a string specifying the font style for the title and axes (if present). Allowed values are:\n\n| Integer | String                | Resulting Style |\n| ------- | --------------------- | --------------- |\n| 0       | "Normal" or "rm"      | Default (roman) |\n| 1       | "Bold" or "bf"        | Bold            |\n| 2       | "Italic" or "it"      | Italic          |\n| 3       | "Bold italic" or "bi" | Bold italic     |',
        },
      },
      {
        label: 'hide',
        insertText: 'hide',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to hide the graphic. Set HIDE to 0 to show the graphic.',
        },
      },
      {
        label: 'histogram',
        insertText: 'histogram',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to connect each point with horizontal and vertical lines. The horizontal lines start at the X location of each point and extend to the next X location. This property is useful for displaying information with discrete or non-linear data, where the X values are typically non-integer bin locations and the Y values represent the "count" of values within each bin. See the STAIRSTEP property for centered bars.\n\n_Tip:_ You can also use the [BARPLOT](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/B/BARPLOT.htm%22%7D) function to create a plot with vertical or horizontal bars.',
        },
      },
      {
        label: 'layout',
        insertText: 'layout',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to a three-element vector \\[_ncol_, _nrow_, _index_\\] that arranges graphics in a grid. The first dimension _ncol_ is the number of columns in the grid, _nrow_ is the number of rows, and _index_ is the grid position at which to place the graphic (starting at element 1). This keyword is ignored if either OVERPLOT or POSITION is specified.',
        },
      },
      {
        label: 'linestyle',
        insertText: 'linestyle',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this property to an integer or string giving the line style for the plot.\n\nThe following table lists the index values, strings, and characters you can use with the LINESTYLE property, and the equivalent characters and strings you can use in the _Format_ string argument.\n\n| Index | LINESTYLE Property                     | Format Argument             | Description      |\n| ----- | -------------------------------------- | --------------------------- | ---------------- |\n| 0     | 'solid\\_line', '-'(dash)               | '-' (dash)                  | solid line       |\n| 1     | 'dot', ':'(colon)                      | ':'(colon)                  | dotted           |\n| 2     | 'dash', '--' (double dashes)           | '--' (double dashes)        | dashed           |\n| 3     | 'dash\\_dot', '-.'                      | '-.'                        | dash dot         |\n| 4     | 'dash\\_dot\\_dot\\_dot', '-:'            | '-:'                        | dash dot dot dot |\n| 5     | 'long\\_dash', '\\_\\_' (two underscores) | '\\_\\_' (double underscores) | long dash        |\n| 6     | 'none', ' ' (space)                    | ' ' (space)                 | no line          |\n\n_Note:_ If you use the LINESTYLE value or _Format_ string '-.', the linestyle is set to dash-dot and the plot symbol is not set.\n\n_Note:_ You can also set LINESTYLE to a two-element vector, \\[_repeat_, _bitmask_\\], specifying a stippling pattern. The _repeat_ indicates the number of times that individual bits in the _bitmask_ should be repeated. (That is, if three consecutive 0’s appear in the _bitmask_ and the value of _repeat_ is 2, then the line that is drawn will have six consecutive bits turned off.) The value of _repeat_ must be an integer between 1 and 255\\. The _bitmask_ indicates which pixels are drawn and which are not along the length of the line. The _bitmask_ should be specified as a 16-bit hexadecimal value. For example, LINESTYLE = \\[2, 'F0F0'X\\] describes a dashed line (8 bits on, 8 bits off, 8 bits on, 8 bits off).",
        },
      },
      {
        label: 'location',
        insertText: 'location',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this keyword to a two-element vector \\[_X offset_, _Y offset_\\] giving the window's screen offset in pixels.",
        },
      },
      {
        label: 'map_projection',
        insertText: 'map_projection',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A string giving the name of the current map projection. After creation, use this property to retrieve or set the current map projection.',
        },
      },
      {
        label: 'mapgrid',
        insertText: 'mapgrid',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'If a map projection is currently in effect, this property retrieves a reference to the [MAPGRID](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/M/MAPGRID.htm%22%7D) object.',
        },
      },
      {
        label: 'mapprojection',
        insertText: 'mapprojection',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'If a map projection is currently in effect, this property retrieves a reference to the [MAPPROJECTION](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/M/MAP.htm%22%7D) object.',
        },
      },
      {
        label: 'margin',
        insertText: 'margin',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to the current graphic’s margin values in the layout specified by the LAYOUT property. Use a scalar value to set the same margin on all sides, or use a four-element vector \\[_left_, _bottom_, _right_, _top_\\] to specify different margins on each side.\n\nBy default, margin values are expressed in normalized units ranging from 0.0 to 0.5\\. If the DEVICE keyword is set, the values are given in device units (pixels).\n\nThis keyword is ignored if either OVERPLOT or POSITION is specified.',
        },
      },
      {
        label: 'max_value',
        insertText: 'max_value',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'The maximum value to be plotted. If this property is set, data values greater than the value of MAX\\_VALUE are treated as missing data and are not plotted.\n\n_Note:_ The IEEE floating point value NaN is also treated as missing data.',
        },
      },
      {
        label: 'min_value',
        insertText: 'min_value',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'The minimum value to be plotted. If this property is set, data values less than the value of MIN\\_VALUE are treated as missing data and are not plotted.\n\n_Note:_ The IEEE floating point value NaN is also treated as missing data.',
        },
      },
      {
        label: 'name',
        insertText: 'name',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A string that specifies the name of the graphic. The name can be used to retrieve the graphic using the brackets array notation. If NAME is not set then a default name is chosen based on the graphic type.',
        },
      },
      {
        label: 'no_toolbar',
        insertText: 'no_toolbar',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "By default the graphics window will have a toolbar containing some common tools such as Print and Save. Set this keyword to remove the toolbar. This keyword has no effect if the window is already created.\n\n_Tip:_ When the toolbar exists, the minimum window _width_ is set to the toolbar's width, usually around 400 pixels. To create a smaller graphics window, use the NO\\_TOOLBAR keyword.",
        },
      },
      {
        label: 'nodata',
        insertText: 'nodata',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this keyword to 1 to create the graphic, but without any data attached to it. The axes and title (if present) are also created and displayed. If the OVERPLOT keyword is specified, axis ranges will not change.\n\n_Note:_ You must still provide valid input arguments. The data range of the input arguments are used to automatically set the range of the axes. The \\[XYZ\\]RANGE properties may be used to override these default ranges.',
        },
      },
      {
        label: 'overplot',
        insertText: 'overplot',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            "Set this keyword to 1 (one) to place the graphic on top of the currently-selected graphic within the current window. The two graphics items will then share the same set of axes. If no current window exists, then this keyword is ignored and a new window is created.\n\nIf you have a graphic in another window that is not currently selected, you can also set this keyword to that graphic's reference to overplot on top of that graphic.\n\n_Tip:_ For the graphic to have a _new_ set of axes, use the CURRENT keyword instead.",
        },
      },
      {
        label: 'position',
        insertText: 'position',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a four-element vector that determines the position of the graphic within the window. The coordinates \\[X1, Y1, X2, Y2\\] define the lower left and upper right corners of the graphic. Coordinates are expressed in normalized units ranging from 0.0 to 1.0\\. On creation, if the DEVICE keyword is set, the units are given in device units (pixels).\n\n_Note:_ After creation, you can set the POSITION to either a two or four-element vector. If two elements are provided, the center of the graphic will be translated to that position. If four elements are provided, the graphics will be translated and scaled to fit the position.',
        },
      },
      {
        label: 'rgb_table',
        insertText: 'rgb_table',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'The number of the [predefined IDL color table](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/LoadingDefaultColorTables.htm%22%7D), or a 3 x 256 or 256 x 3 byte array containing color values to use for vertex colors. If the values supplied are not of type byte, they are scaled to the byte range using BYTSCL. Use the VERT\\_COLORS property to specify indices that select colors from the values specified with RGB\\_TABLE.',
        },
      },
      {
        label: 'stairstep',
        insertText: 'stairstep',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to 1 to connect each point with horizontal and vertical lines. The horizontal lines are centered at each X location. This property is useful for displaying information with discrete or non-linear data, where the X values are typically integers and the Y values represent the "count" at that X location. See the HISTOGRAM property for bars that span X values.\n\n_Tip:_ You can also use the [BARPLOT](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/Reference%20Material/B/BARPLOT.htm%22%7D) function to create a plot with vertical or horizontal bars.',
        },
      },
      {
        label: 'sym_color',
        insertText: 'sym_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the plot symbol. If this property is not set then the symbol color will match the COLOR.',
        },
      },
      {
        label: 'sym_fill_color',
        insertText: 'sym_fill_color',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to a [string or RGB vector](command:idl.docs.openLink?%7B%22link%22:%22IDL_DOCS/../Subsystems/idl/Content/IDL%20Graphics/FormattingSymsAndLines.htm#Color%22%7D) that specifies the color of the filled portion of the symbol. If this property is not set then the symbol fill color will match the SYM\\_COLOR.',
        },
      },
      {
        label: 'sym_filled',
        insertText: 'sym_filled',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value: 'Set this property to 1 to fill the symbols.',
        },
      },
      {
        label: 'sym_increment',
        insertText: 'sym_increment',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'Set this property to an integer value specifying the number of plot vertices between symbols. The default value is 1, which places a symbol on every vertex.',
        },
      },
      {
        label: 'sym_object',
        insertText: 'sym_object',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            ' Set this property equal to an object reference to be used for the plotting symbol. The SYM\\_OBJECT may be either an IDLgrModel object or an atomic graphics object. \n\n_Note:_ When using custom plotting symbols, note that the SYM\\_OBJECT property takes precedence over the SYMBOL property. In other words, if you set a custom symbol using SYM\\_OBJECT, then try to change that symbol using the SYMBOL property, IDL ignores the new SYMBOL property and retains SYM\\_OBJECT.',
        },
      },
      {
        label: 'sym_size',
        insertText: 'sym_size',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value specifying the size of the plot symbol. A value of 1.0 produces a symbol that is 10% of the width/height of the plot.',
        },
      },
      {
        label: 'sym_thick',
        insertText: 'sym_thick',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'A floating point value from 1.0 to 10.0 that specifies the thickness (in points) of the plot symbol.',
        },
      },
      {
        label: 'sym_transparency',
        insertText: 'sym_transparency',
        kind: 5,
        sortText: '02',
        detail: 'Property of Plot',
        documentation: {
          kind: 'markdown',
          value:
            'An integer between 0 and 100 that specifies the percent transparency of the symbols. The default value is 0.',
        },
      },
    ];

    // verify results
    expect(expectedFound_4).toEqual(
      (
        await index.getAutoComplete(
          filepath,
          await readFile(filepath, 'utf-8'),
          position_4
        )
      ).slice(0, 50)
    );
  });
});
