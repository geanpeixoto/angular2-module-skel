import { CallbackFn } from '../utils/tasks-helper';

const rimraf = require('rimraf');

export function cleanTask(dir: string) {
  return (done: CallbackFn) => rimraf(dir, done);
}
