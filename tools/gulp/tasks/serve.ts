import { CallbackFn } from './../utils/tasks-helper';
import { join } from 'path';
const browserSync = require('browser-sync');

export type OpenType = false | 'local' | 'external';

export type Middleware = (req: any, res: any, next: CallbackFn) => void;

export interface StartConfig {
  baseDir: string;
  middleware?: Middleware[];
  open?: OpenType;
}

export function start({ baseDir, middleware, open = false }: StartConfig) {
  return (done: CallbackFn) => {
    browserSync.init({
      open: false,
      server: {
        baseDir,
        routes: {
          '/vendor': join(baseDir, '../node_modules'),
        },
      },
      logLevel: 'silent',
      middleware,
      cors: true,
    });
    done();
  };
}

export function reload() {
  return (done?: CallbackFn) => {
    browserSync.reload();
    if (done) {
      done();
    }
  };
}
