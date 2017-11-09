(function(global) {

  var ngVer = '@5.0.0';

  // map tells the System loader where to look for things
  var map = {
    'app':  'app', // 'dist',
    'rxjs': 'https://unpkg.com/rxjs@5.5.2',
    '@angular': 'https://unpkg.com/@angular',
    'angular-dual-listbox': 'lib'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':  { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs': { defaultExtension: 'js' },
    'angular-dual-listbox': { main: 'index.ts', defaultExtension: 'ts' }
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
    map['@angular/'+pkgName] = 'https://unpkg.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  });

  var config = {
//	transpiler: 'typescript',
	transpiler: 'ts',
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
