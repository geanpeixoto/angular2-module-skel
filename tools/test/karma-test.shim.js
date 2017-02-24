__karma__.loaded = function () {};

var baseDir = '/base/dist/';
var project = '@company/skel';

var specFiles = Object.keys(window.__karma__.files).filter(isSpecFile);

console.log(specFiles);

System.config({baseURL: baseDir});
System.import(baseDir + project + '/system-config-spec.js')
  .then(configureTestBed)
  .then(runSpecs)
  .then(__karma__.start, __karma__.error);

function isSpecFile(path) {
  return path.slice(-8) === '.spec.js' && path.indexOf('vendor') === -1;
}

function runSpecs() {
  // By importing all spec files, Karma will run the tests directly.
  return Promise.all(specFiles.map(function(fileName) {
    return System.import(fileName);
  }));
}

function configureTestBed() {
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ]).then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    testing.TestBed.initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  });
}