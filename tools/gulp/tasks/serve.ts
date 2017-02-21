import { CallbackFn } from './../utils/tasks-helper';
const browserSync = require('browser-sync');

export type Middleware = (req: any, res: any, next: CallbackFn) => void;

export function start(baseDir: string, middleware?: Middleware[]) {
  return (done: CallbackFn) => {
    browserSync.init({
      server: {
        baseDir,
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
