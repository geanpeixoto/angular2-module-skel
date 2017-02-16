const angularModules = [
  'core',
  'common',
  'compiler',
  'http',
  'router',
  'platform-browser',
  'platform-browser-dynamic',
].reduce<{ [k: string]: string }>((r, mod) => {
  r[`@angular/${mod}`] = `vendor/@angular/${mod}/bundles/${mod}.umd`
  return r;
}, {});


System.config({
  packages: {
    '@company/skel': {
      main: 'index.js'
    },
    '.': {
      defaultExtension: 'js'
    }
  },
  map: {
    'rxjs': 'vendor/rxjs',
    ...angularModules,
  }
});