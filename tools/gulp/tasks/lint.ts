import { CallbackFn, execNodeTask } from '../utils/tasks-helper';

export function tslintTask(tsConfigPath: string, breakOnFailure?: boolean) {
  return (done: CallbackFn) => {
    const callback = (err: any) => done(breakOnFailure && err);
    execNodeTask('tslint', 'tslint', ['--project', tsConfigPath])(callback);
  };
}
