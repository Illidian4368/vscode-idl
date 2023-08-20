import { Logger } from '@idl/logger';

import { Runner } from '../runner.class';
import { NotebookFormats_1_0_0 } from './notebook-formats-1.0.0';
import { NotebookFormats_2_0_0 } from './notebook-formats-2.0.0';
import { NotebookProblemsTrackRight } from './notebook-problems-track-right';
import { RunNotebookReset } from './notebook-reset';
import { RunNotebookStop } from './notebook-stop';
import { RunProblemNotebooks } from './run-problem-notebooks';
import { RunTestENVIMapNotebook } from './run-test-envi-map-notebook';
import { RunTestENVINotebook } from './run-test-envi-notebook';
import { RunTestNotebook } from './run-test-notebook';
import { SaveAndClearNotebook } from './save-and-clear-output';

/*
 * Logger to be used for tests related to debugging
 */
export const NOTEBOOK_TEST_LOGGER = new Logger(
  'tests-notebook',
  false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);

/**
 * Test runner for debugging
 */
export const NOTEBOOK_RUNNER = new Runner(NOTEBOOK_TEST_LOGGER);

NOTEBOOK_RUNNER.addTest({
  name: 'Make sure we properly open format 1.0.0',
  fn: NotebookFormats_1_0_0,
  critical: true,
});

NOTEBOOK_RUNNER.addTest({
  name: 'Make sure we properly open format 2.0.0',
  fn: NotebookFormats_2_0_0,
  critical: true,
});

NOTEBOOK_RUNNER.addTest({
  name: 'Run notebook that tests successes',
  fn: RunTestNotebook,
  critical: true,
});

NOTEBOOK_RUNNER.addTest({
  name: 'Run notebooks that test problems are handled right',
  fn: RunProblemNotebooks,
  critical: true,
});

NOTEBOOK_RUNNER.addTest({
  name: 'Save output and reload',
  fn: SaveAndClearNotebook,
  critical: true,
});

NOTEBOOK_RUNNER.addTest({
  name: 'Run notebook that embeds rasters and do basic check they are right',
  fn: RunTestENVINotebook,
});

// can run ENVI map notebook
NOTEBOOK_RUNNER.addTest({
  name: 'Notebook maps through ENVI run and basic checks outputs are right',
  fn: RunTestENVIMapNotebook,
});

// reset goes first
NOTEBOOK_RUNNER.addTest({
  name: 'Reset does the right thing',
  fn: RunNotebookReset,
  critical: true,
});

// stop at the end to make sure the process exits
NOTEBOOK_RUNNER.addTest({
  name: 'Stop does the right thing',
  fn: RunNotebookStop,
  critical: true,
});

// notebook problems track right
NOTEBOOK_RUNNER.addTest({
  name: 'Notebook problems track right',
  fn: NotebookProblemsTrackRight,
});
