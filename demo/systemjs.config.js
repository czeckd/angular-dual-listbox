(function(global) {

  var ngVer = '@2.0.0-rc.6';

  // map tells the System loader where to look for things
  var map = {
    'app':  'app', // 'dist',
    'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.11',
    '@angular': 'https://npmcdn.com/@angular'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':  { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs': { defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
	'forms',
    'platform-browser',
    'platform-browser-dynamic'
  ];

  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  });

  var config = {
	transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before it is registered.
  if (global.filterSystemConfig) {
    global.filterSystemConfig(config);
  }

  System.config(config);

})(this);
