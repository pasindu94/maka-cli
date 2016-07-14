var ApiGenerator = Generator.create({
  name: 'api',
  aliases: ['api'],
  usage: 'maka {generate, g}:{api} <concept>',
  description: 'Generate scaffolding for a api concept (i.e. Todos).',
  examples: [
    'maka g:api todos'
  ]
}, function (args, opts) {

    var pathToApi = this.pathFromApp(
        'imports/api',
        opts.dir,
        this.fileCase(opts.resourceName),
        this.fileCase(opts.resourceName)
    );

  var context = {
    name: this.classCase(opts.resourceName),
    fileName: this.fileCase(opts.resourceName),
    camelCase: this.camelCase(opts.resourceName)
  };

  this.template(
    'api/collection.js',
    pathToApi + '.js',
    context
  );

  this.template(
    'api/api.js',
    this.pathFromApp('imports/api/', this.fileCase(opts.resourceName), 'api.js'),
    context
  );

  this.template(
    'api/methods.js',
    this.pathFromApp('imports/api/', this.fileCase(opts.resourceName), 'methods.js'),
    context
  );

  this.template(
    'api/fixtures.js',
    this.pathFromApp('imports/api/', this.fileCase(opts.resourceName), 'fixtures.js'),
    context
  );

  this.template(
    'api/server/publications.js',
    this.pathFromApp('imports/api/', this.fileCase(opts.resourceName), 'server', 'publications.js'),
    context
  );

  this.template(
    'api/register-api.js',
    this.pathFromApp('imports/startup/server', 'register-' + this.fileCase(opts.resourceName) + '-api.js'),
    context
  );

  var destPath = this.pathFromApp('imports/startup/server/index.js');
  this.injectAtEndOfFile(destPath, 'import \'./register-' + this.fileCase(opts.resourceName) + '-api.js\';');
});
