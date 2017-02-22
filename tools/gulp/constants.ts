import { join } from 'path';
import * as globals from './utils/globals-helper';

const { name, main, module, global } = require('../../src/lib/package.json');
const { dependencies } = require('../../package.json');

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');
export const LIB_ROOT = join(SOURCE_ROOT, 'lib');
export const LIB_ASSETS = [
  join(LIB_ROOT, '**/*'),
  join('!', LIB_ROOT, '**/*.ts'),
  join('!', LIB_ROOT, 'tsconfig.json'),
  join('!', LIB_ROOT, 'tsconfig-srcs.json'),
];
export const DEMOAPP_ROOT = join(SOURCE_ROOT, 'demo-app');
export const DEMOAPP_ASSETS = [join(DEMOAPP_ROOT, '**/*.!(ts)')];
export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const LIB_DIST_ROOT = join(DIST_ROOT, name);
export const LIB_DIST_MAIN = join(LIB_DIST_ROOT, main);
export const LIB_DIST_MODULE = join(LIB_DIST_ROOT, module);
export const DEPENDENCIES = Object.keys(dependencies);
export const GLOBAL = global || globals.getAlias(name);
export const GLOBALS_MAP = globals.fromDependencies(DEPENDENCIES);
