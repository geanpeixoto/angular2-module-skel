import { CallbackFn } from './utils/tasks-helper';
import { join } from 'path';

import { copy, ngcBuildTask, tsBuildTask, copyTask, sassBuildTask, inlineResourcesTask } from './tasks/build';
import { rollupTask } from './tasks/rollup';
import { cleanTask } from './tasks/clean';
import { vendorTask } from './tasks/development';
import { tslintTask } from './tasks/lint';
import * as serve from './tasks/serve';
import * as test from './tasks/test';

import {
  LIB_ROOT, LIB_DIST_ROOT, DIST_ROOT, GLOBALS_MAP, GLOBAL,
  DEPENDENCIES, PROJECT_ROOT, DEMOAPP_ROOT, LIB_ASSETS,
  DEMOAPP_ASSETS, LIB_DIST_MODULE, LIB_DIST_MAIN,
} from './constants';

const { task, parallel, series, watch } = require('gulp');

task('clean', cleanTask(DIST_ROOT));
task(':lint:lib', tslintTask(join(LIB_ROOT, 'tsconfig.json')));
task(':build:lib:ngc', ngcBuildTask(join(LIB_ROOT, 'tsconfig.json')));
task(':build:lib:ts-es6', tsBuildTask(join(LIB_ROOT, 'tsconfig-es6.json')));
task(':build:lib:ts-cjs', tsBuildTask(LIB_ROOT));
task(':build:lib:sass', sassBuildTask(LIB_ROOT, LIB_DIST_ROOT));
task(':build:lib:assets', copyTask(LIB_ASSETS, LIB_DIST_ROOT));
task(':build:lib:inline-resources', inlineResourcesTask(LIB_DIST_ROOT));
task(':build:lib:rollup', rollupTask(LIB_DIST_MODULE, LIB_DIST_MAIN, GLOBAL, GLOBALS_MAP));
task('build:lib', series('clean', buildLibTask(), ':build:lib:inline-resources', ':build:lib:rollup'));
task(':lint:demoapp', tslintTask(join(DEMOAPP_ROOT, 'tsconfig.json')));
task(':build:demoapp:lib', buildLibTask(true));
task(':build:demoapp:ts', tsBuildTask(DEMOAPP_ROOT));
task(':build:demoapp:sass', sassBuildTask(DEMOAPP_ROOT, DIST_ROOT));
task(':build:demoapp:assets', copyTask(DEMOAPP_ASSETS, DIST_ROOT));
task(':build:demoapp:vendor', vendorTask(DEPENDENCIES, join(PROJECT_ROOT, 'node_modules'), join(DIST_ROOT, 'vendor')));
task('build:demoapp', series('clean', series(
  ':build:demoapp:lib',
  parallel(
    ':build:demoapp:ts',
    ':build:demoapp:sass',
    ':build:demoapp:assets',
    // ':build:demoapp:vendor',
  ),
)));

task(':test:single-run', test.singleTestTask(join(PROJECT_ROOT, 'tools/test/karma.config.js')));
task(':test:watch', testWatchTask());
task(':test', test.testTask(join(PROJECT_ROOT, 'tools/test/karma.config.js')));
task('test:single-run', series('clean', ':build:demoapp:vendor', ':build:demoapp:lib', ':test:single-run'));
task('test', series('clean',
  ':build:demoapp:vendor',
  ':build:demoapp:lib',
  ':test:watch',
  ':test',
));

task(':dev:watch', devWatchTask());
task(':dev:serve', serve.start(DIST_ROOT));
task(':dev:reload', serve.reload());
task('dev', series('build:demoapp', ':dev:serve', ':dev:watch'));

function buildLibTask(development?: boolean) {
  return parallel(
    ':lint:lib',
    ...(development ? [':build:lib:ts-cjs'] : [':build:lib:ngc', ':build:lib:ts-es6']),
    ':build:lib:assets',
    ':build:lib:sass',
  );
}

function copyAssetTo(dist: string) {
  const reload = serve.reload();
  return function copyAsset(asset: string) {
    if (!asset.match(/\.(ts|sass)$/)) {
      console.log(`Changed: ${asset}`);
      copy([asset], dist);
      reload();
    }
  };
}

function testWatchTask() {
  return (done: CallbackFn) => {
    watch(join(LIB_ROOT, '**/*'), series(':build:demoapp:lib'));
    done();
  };
}

function devWatchTask() {
  return (done: CallbackFn) => {
    watch(join(LIB_ROOT, '**/*.ts'), series(':build:lib:ts-cjs', ':dev:reload'));
    watch(join(DEMOAPP_ROOT, '**/*.ts'), series(':build:demoapp:ts', ':dev:reload'));
    watch(join(LIB_ROOT, '**/*.{sass,scss}'), series(':build:lib:sass', ':dev:reload'));
    watch(join(DEMOAPP_ROOT, '**/*.{sass,scss}'), series(':build:demoapp:sass', ':dev:reload'));
    watch(join(LIB_ROOT, '**/*.html'), series(':build:lib:assets', ':dev:reload'));
    watch(join(DEMOAPP_ROOT, '**/*.html'), series(':build:demoapp:assets', ':dev:reload'));
    done();
  };
}
