'use strict';
/**
 * Carrega o compilador typescript, então carrega o gulpfile escrito em TypeScript.
 * As tarefas estão realmente escritas dentro de tools/gulp/tasks.
 */

const { join } = require('path');

require('ts-node').register({
  project: join(__dirname, 'tools/gulp')
});

require('./tools/gulp/gulpfile');