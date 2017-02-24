const {join} = require('path');
module.exports = function (config) {
  config.set({
    basePath: join(__dirname, '../..'),
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-sourcemap-loader')
    ],
    files: [
      { pattern: 'dist/vendor/core-js/client/core.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/zone.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/proxy.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/sync-test.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/jasmine-patch.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/async-test.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/fake-async-test.js', included: true, watched: false },
      { pattern: 'tools/test/karma-test.shim.js', included: true, watched: false },

      // paths loaded via module imports
      { pattern: 'dist/**/*.js', included: false, watched: true },

      // paths to support debugging with source maps in dev tools
      { pattern: 'dist/**/*.ts', included: false, watched: false },
      { pattern: 'dist/**/*.js.map', included: false, watched: false }
    ],
    exclude: [],
    preprocessors: {
      '**/*.js': ['sourcemap']
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  });
};
