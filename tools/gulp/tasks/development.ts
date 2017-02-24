import { CallbackFn } from './../utils/tasks-helper';
import { copy } from './build';
import { join } from 'path';

const merge = require('merge-stream');

const gulp = require('gulp');

/** Retorna uma tarefa que copia os arquivos das dependências  */
export function vendorTask(dependencies: string[], dependenciesRoot: string, dist: string) {
  return (done: CallbackFn) => {
    const streams = dependencies
      .map(dependency => {
        const glob = join(dependenciesRoot, dependency, '**/*.!(scss|ts)');
        return copy([glob], join(dist, dependency));
      });
    return merge(streams);
  };
}