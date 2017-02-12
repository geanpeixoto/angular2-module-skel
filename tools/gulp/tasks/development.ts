import { copyTask } from './build';
import { join } from 'path';

const gulp = require('gulp');

/** Retorna uma tarefa que copia os arquivos das dependências  */
export function vendorTask(dependencies: string[], dependenciesRoot: string, dist: string) {
  return gulp.parallel(
    dependencies
      .map(dependency => {
        const glob = join(dependenciesRoot, dependency, '**/*.+(js|js.map)');
        return copyTask([glob], join(dist, dependency));
      }));
}