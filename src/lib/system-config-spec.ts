// TODO: Fazer com que este arquivo seja gerado automagicamente.

const angularModules = [
  'core',
  'common',
  'compiler',
  'http',
  'router',
  'platform-browser',
  'platform-browser-dynamic',
].reduce<{ [k: string]: string }>((r, mod) => {
  return {
    ...r, 
    [`@angular/${mod}`]: `vendor/@angular/${mod}/bundles/${mod}.umd`,
    [`@angular/${mod}/testing`]: `vendor/@angular/${mod}/bundles/${mod}-testing.umd`,
  };
}, {});

System.config({
  packages: {
    '@company/skel': {
      main: 'index.js',
    },
    '.': {
      defaultExtension: 'js',
    },
  },
  map: {
    '@angular/core/testing': 'vendor/@angular/core/bundles/core-testing.umd.js',
    rxjs: 'vendor/rxjs',
    ...angularModules,
  },
});
