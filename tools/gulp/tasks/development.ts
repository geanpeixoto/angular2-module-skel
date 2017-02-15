import { CallbackFn } from './../utils/tasks-helper';
import { copy } from './build';
import { join } from 'path';

const gulp = require('gulp');

/** Retorna uma tarefa que copia os arquivos das dependências  */
export function vendorTask(dependencies: string[], dependenciesRoot: string, dist: string) {
  return (done: CallbackFn) => {
    dependencies
      .map(dependency => {
        const glob = join(dependenciesRoot, dependency, '**/*.+(js|js.map)');
        return copy([glob], join(dist, dependency));
      });
    done();
  }
}