import { join, dirname, basename } from 'path';

const gulp = require('gulp');
const gulpRollup = require('gulp-better-rollup');

export interface Dependencies {
  [name: string]: string;
};

export function rollupTask(input: string, output: string, moduleName: string, dependencies: Dependencies) {
  const rollupOptions = {
    context: 'this',
    external: Object.keys(dependencies),
  };

  const rollupGenerateOptions = {
    // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
    moduleId: '',
    moduleName,
    format: 'umd',
    globals: dependencies,
    dest: basename(output),
  };

  return () => gulp.src(input)
    .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
    .pipe(gulp.dest(dirname(output)));
}
