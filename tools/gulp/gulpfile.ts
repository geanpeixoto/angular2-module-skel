import { join } from 'path';

import { tsBuildTask, copyTask, sassBuildTask, inlineResourcesTask } from './tasks/build';
import { rollupTask } from './tasks/rollup';
import { cleanTask } from './tasks/clean';
import { vendorTask } from './tasks/development';
import * as serve from './tasks/serve';

import {
  LIB_ROOT, LIB_DIST_ROOT, DIST_ROOT, GLOBALS, GLOBAL,
  DEPENDENCIES, PROJECT_ROOT, DEMOAPP_ROOT, LIB_ASSETS,
  DEMOAPP_ASSETS
} from './constants';

const { task, parallel, series, watch } = require('gulp');

task('clean', cleanTask(DIST_ROOT));

task('build:prod',
  series(
    'clean',
    parallel(
      tsBuildTask(join(LIB_ROOT, 'tsconfig-srcs.json')),
      copyTask(LIB_ASSETS, LIB_DIST_ROOT),
      sassBuildTask(LIB_ROOT, LIB_DIST_ROOT)
    ),
    inlineResourcesTask(LIB_DIST_ROOT),
    rollupTask(join(LIB_DIST_ROOT, 'index.js'), join(LIB_DIST_ROOT, 'bundles/skel.umd.js'), GLOBAL, GLOBALS)
  )
);

task(':build:dev:lib:ts', tsBuildTask(LIB_ROOT));
task(':build:dev:demoapp:ts', tsBuildTask(DEMOAPP_ROOT));
task(':build:dev:lib:sass', sassBuildTask(LIB_ROOT, LIB_DIST_ROOT));
task(':build:dev:demoapp:sass', sassBuildTask(DEMOAPP_ROOT, LIB_DIST_ROOT));
task('build:dev',
  series(
    'clean',
    parallel(
      /** Compila a lib */
      ':build:dev:lib:ts',
      ':build:dev:lib:sass',
      copyTask(LIB_ASSETS, LIB_DIST_ROOT),
      /** Compila o demo-app */
      ':build:dev:demoapp:ts',
      ':build:dev:demoapp:sass',
      copyTask(DEMOAPP_ASSETS, DIST_ROOT),
      /** Copia as blibliotecas */
      vendorTask(DEPENDENCIES, join(PROJECT_ROOT, 'node_modules'), join(DIST_ROOT, 'vendor'))
    )
  )
)

function copyAssetTo(dist: string) {
  const reload = serve.reload();
  return (asset: string) => {
    if (!asset.match(/\.(ts|sass)$/)) {
      console.log(`Changed: ${asset}`);
      copyTask([asset], dist);
      reload();
    }
  }
}

task(':watch', () => {
  const reload = serve.reload();
  watch(join(LIB_ROOT, '**/*.ts'), series(':build:dev:lib:ts', reload));
  watch(join(DEMOAPP_ROOT, '**/*.ts'), series(':build:dev:demoapp:ts', reload));
  watch(join(LIB_ROOT, '**/*.{sass,scss}'), series(':build:dev:lib:sass', reload));
  watch(join(DEMOAPP_ROOT, '**/*.{sass,scss}'), series(':build:dev:demoapp:sass', reload));

  watch(DEMOAPP_ASSETS).on('change', copyAssetTo(DIST_ROOT));
  watch(LIB_ASSETS).on('change', copyAssetTo(LIB_DIST_ROOT));
});

task('dev',
  series(
    'build:dev',
    serve.start(DIST_ROOT),
    ':watch'
  )
)