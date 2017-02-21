import { execNodeTask } from '../utils/tasks-helper';

export function tslintTask(tsConfigPath: string) {
  return execNodeTask('tslint', 'tslint', ['--project', tsConfigPath]);
}
