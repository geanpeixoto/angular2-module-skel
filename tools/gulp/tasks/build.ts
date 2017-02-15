import * as fs from 'fs';
import * as path from 'path';
import { execNodeTask, CallbackFn } from '../utils/tasks-helper';
import { inlineResources } from '../utils/inline-resources';

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpAutoprefixer = require('gulp-autoprefixer');

/** 
 * Se a string informada for um glob, retorne ela, Do contrário, adicione o suffixo a ela. 
 */
function _globify(maybeGlob: string, suffix = '**/*') {
  if (maybeGlob.indexOf('*') != -1) {
    return maybeGlob;
  }
  try {
    const stat = fs.statSync(maybeGlob);
    if (stat.isFile()) {
      return maybeGlob;
    }
  } catch (e) { }
  return path.join(maybeGlob, suffix);
}

/** 
 * Retorna uma função que irá compilar os arquivos TypeScript utilizando o arquivo informado 
 */
export function tsBuildTask(tsConfigPath: string) {
  return execNodeTask('typescript', 'tsc', ['-p', tsConfigPath]);
}

/** Retorna uma função que irá compilar os arquivos SCSS */
export function sassBuildTask(root: string, dest: string) {
  const SASS_AUTOPREFIXER_OPTIONS = {
    browsers: [
      'last 2 versions',
      'not ie <= 10',
      'not ie_mob <= 10',
    ],
    cascade: false,
  };

  return () => gulp.src(_globify(root, '**/*.scss'))
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulpAutoprefixer(SASS_AUTOPREFIXER_OPTIONS))
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest(dest));
}

/**
 * Retorna uma função que irá transformar todos os recursos para a declação inline
 */
export function inlineResourcesTask(dir: string) {
  return () => inlineResources(dir);
}

/**
 * Retorna uma função que irá copiar todos os arquivos informados para a pasta destino
 */
export function copyTask(files: string[], outRoot: string) {
  return () => gulp.src(files).pipe(gulp.dest(outRoot));
}