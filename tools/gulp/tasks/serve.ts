import { CallbackFn } from './../utils/tasks-helper';
const browserSync = require('browser-sync');

export interface Middleware {
  (req: any, res: any, next: CallbackFn): void
}

export function start(baseDir: string, middleware?: Middleware[]) {
  return (done: CallbackFn) => {
    browserSync.init({
      server: {
        baseDir
      },
      middleware,
      cors: true
    });
    done();
  }
}

export function reload() {
  return () => browserSync.reload();
}