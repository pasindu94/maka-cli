Package.describe({
  name: "<%= name %>",
  summary: "What this does",
  version: "1.0.0",
  git: "https://github.com/<username>/<%= fileName %>.git",
});

Package.onUse((api) => {
  api.versionsFrom('1.3.1');

  api.use('ecmascript');

  let packages = [
    'iron:router'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles('lib/<%= fileName %>.js', ['client', 'server']);
  api.addFiles('client/<%= fileName %>.js', 'client');
  api.addFiles('server/<%= fileName %>.js', 'server');

  api.export('<%= className %>');
});

Package.onTest((api) => {
  api.use('<%= name %>');
  api.use('ecmascript');
  api.use('tinytest@1.0.0');
  api.addFiles('test/<%= name %>.js', 'server');
});
