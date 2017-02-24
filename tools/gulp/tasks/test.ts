import { CallbackFn } from '../utils/tasks-helper';

export function singleTestTask(configFile: string) {
  const {Server} = require('karma');
  return (done: CallbackFn) => {
    const server = new Server(
      {
        configFile,
        singleRun: true,
      },
      (exitCode: number) => done(exitCode),
    );
    server.start();
  };
}

export function testTask(configFile: string) {
  const {Server} = require('karma');
  return (done: CallbackFn) => {
    const server = new Server(
      {
        configFile,
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome'],
      }
    );
    server.start();
    done();
  };
}
