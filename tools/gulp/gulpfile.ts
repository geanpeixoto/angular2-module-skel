import { CallbackFn } from './utils/tasks-helper';
import { join } from 'path';

import { copy, ngcBuildTask, tsBuildTask, copyTask, sassBuildTask, inlineResourcesTask } from './tasks/build';
import { rollupTask } from './tasks/rollup';
import { cleanTask } from './tasks/clean';
import { vendorTask } from './tasks/development';
import { tslintTask } from './tasks/lint';
import * as serve from './tasks/serve';

import {
  LIB_ROOT, LIB_DIST_ROOT, DIST_ROOT, GLOBALS_MAP, GLOBAL,
  DEPENDENCIES, PROJECT_ROOT, DEMOAPP_ROOT, LIB_ASSETS,
  DEMOAPP_ASSETS, LIB_DIST_MODULE, LIB_DIST_MAIN,
} from './constants';

const { task, parallel, series, watch } = require('gulp');

task('clean', cleanTask(DIST_ROOT));
task(':lint:lib', tslintTask(join(LIB_ROOT, 'tsconfig-srcs.json')));
task(':build:lib:ts', tsBuildTask(join(LIB_ROOT, 'tsconfig-srcs.json')));
task(':build:lib:aoc', ngcBuildTask(join(LIB_ROOT, 'tsconfig-srcs.json')));
task(':build:lib:ts-cjs', tsBuildTask(LIB_ROOT));
task(':build:lib:sass', sassBuildTask(LIB_ROOT, LIB_DIST_ROOT));
task(':build:lib:assets', copyTask(LIB_ASSETS, LIB_DIST_ROOT));
task(':build:lib:inline-resources', inlineResourcesTask(LIB_DIST_ROOT));
task(':build:lib:rollup', rollupTask(LIB_DIST_MODULE, LIB_DIST_MAIN, GLOBAL, GLOBALS_MAP));
task('build:lib', series('clean', buildLibTask(), ':build:lib:rollup'));
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
    ':build:demoapp:vendor',
  ),
)));

task(':dev:watch', watchTask());
task(':dev:serve', serve.start(DIST_ROOT));
task(':dev:reload', serve.reload());
task('dev', series('build:demoapp', ':dev:serve', ':dev:watch'));

function buildLibTask(useCjs?: boolean) {
  return series(
    parallel(
      ':lint:lib',
      `:build:lib:${useCjs ? 'ts-cjs' : 'aoc'}`,
      ':build:lib:assets',
      ':build:lib:sass',
    ),
    ':build:lib:inline-resources',
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

function watchTask() {
  return (done: CallbackFn) => {
    watch(join(LIB_ROOT, '**/*'), series(':build:demoapp:lib', ':dev:reload'));
    watch(join(DEMOAPP_ROOT, '**/*.ts'), series(':build:demoapp:ts', ':dev:reload'));
    watch(join(DEMOAPP_ROOT, '**/*.{sass,scss}'), series(':build:demoapp:sass', ':dev:reload'));
    watch(DEMOAPP_ASSETS).on('change', copyAssetTo(DIST_ROOT));
    done();
  };
}
