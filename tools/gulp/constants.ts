import { join } from 'path';

const { name, main, module } = require('../../src/lib/package.json');
const { dependencies } = require('../../package.json');

export const PROJECT_ROOT = join(__dirname, '../..');
export const SOURCE_ROOT = join(PROJECT_ROOT, 'src');
export const LIB_ROOT = join(SOURCE_ROOT, 'lib');
export const LIB_ASSETS = [
  join(LIB_ROOT, '**/*.!(ts)'),
  join('!', LIB_ROOT, 'tsconfig.json'),
  join('!', LIB_ROOT, 'tsconfig-srcs.json')
];
export const DEMOAPP_ROOT = join(SOURCE_ROOT, 'demo-app');
export const DEMOAPP_ASSETS = [join(DEMOAPP_ROOT, '**/*.!(sass|ts)')];
export const DIST_ROOT = join(PROJECT_ROOT, 'dist');
export const LIB_DIST_ROOT = join(DIST_ROOT, name);
export const LIB_DIST_MAIN = join(LIB_DIST_ROOT, main);
export const LIB_DIST_MODULE = join(LIB_DIST_ROOT, module);
export const DEPENDENCIES = Object.keys(dependencies);
export const GLOBAL = name.replace('@', '').replace('\/', '.');
export const GLOBALS = {
  ... DEPENDENCIES
        .filter(dep => dep.startsWith('@angular/'))
        .reduce<{[f: string]: string}>((r, dep) => {
          r[dep] = dep
            .replace('@angular/', 'ng.')
            .replace(/\-\w/, r => r[1].toUpperCase());
          return r;
        }, {}),

  // Rxjs dependencies
  'rxjs/Subject': 'Rx',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/observable/forkJoin': 'Rx.Observable',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/merge': 'Rx.Observable',
  'rxjs/add/observable/throw': 'Rx.Observable',
  'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/filter': 'Rx.Observable.prototype',
  'rxjs/add/operator/do': 'Rx.Observable.prototype',
  'rxjs/add/operator/share': 'Rx.Observable.prototype',
  'rxjs/add/operator/finally': 'Rx.Observable.prototype',
  'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  'rxjs/add/operator/first': 'Rx.Observable.prototype',
  'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/Observable': 'Rx'
}