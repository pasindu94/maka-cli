Package.describe({
  name: "<%= name %>",
  summary: "What this does",
  version: "0.0.1",
  git: "https://github.com/<username>/<%= fileName %>.git",
});

//Npm.depends({});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2');

  api.use('ecmascript');

  var packages = [
    'iron:router'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles('lib/<%= fileName %>.js', ['client', 'server']);
  api.addFiles('client/<%= fileName %>.js', 'client');
  api.addFiles('server/<%= fileName %>.js', 'server');

  api.export('<%= className %>');
});

Package.onTest(function(api) {
  api.use('<%= name %>');
  api.use('ecmascript');
  api.use('tinytest@1.0.0');
  api.addFiles('test/<%= name %>.js', 'server');
});
