import { Assembler } from '@idl/assembler';
import { LogManager } from '@idl/logger';
import { GetTokenNames } from '@idl/parser';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { SyntaxProblems } from '@idl/parsing/problem-codes';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Generate structure docs`, () => {
  it(`[auto generated] and verify spacing for empty structures`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // test code to extract tokens from
    const code = [
      `pro pro4__define`,
      `  compile_opt idl2`,
      ``,
      `  !null = {struct1}`,
      ``,
      `  !null = {struct2}`,
      ``,
      `  !null = {struct3, prop: 'socool'}`,
      ``,
      `end`,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode('my_file.pro', code, {
      postProcess: true,
    });

    // extract token names
    const tokenizedNames = GetTokenNames(tokenized);

    // format code
    const formatted = Assembler(tokenized, {
      autoDoc: true,
      autoFix: false,
      formatter: 'fiddle',
    });

    // verify formatting
    if (formatted === undefined) {
      expect(formatted).toEqual(undefined);
    } else {
      // define expected problems
      const expectedFormatting: string[] = [
        `;+`,
        `; :struct1:`,
        `;`,
        `; :struct2:`,
        `;`,
        `; :struct3:`,
        `;   prop: any`,
        `;     Placeholder docs for argument, keyword, or property`,
        `;`,
        `;-`,
        `pro pro4__define`,
        `  compile_opt idl2`,
        ``,
        `  !null = {struct1}`,
        ``,
        `  !null = {struct2}`,
        ``,
        `  !null = {struct3, prop: 'socool'}`,
        `end`,
      ];

      // verify formatting
      expect(formatted.split(`\n`)).toEqual(expectedFormatting);

      // parse formatted code
      const reParsed = await index.getParsedProCode('my_file.pro', formatted, {
        postProcess: true,
      });

      // make sure the syntax trees are the same as they were before
      expect(GetTokenNames(reParsed)).toEqual(tokenizedNames);
    }

    // define expected problems
    const expectedProblems: SyntaxProblems = [];

    // verify problems
    expect(
      tokenized.parseProblems.concat(tokenized.postProcessProblems)
    ).toEqual(expectedProblems);
  });
});
