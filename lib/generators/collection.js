var CollectionGenerator = Generator.create({
  name: 'collection',
  aliases: ['col'],
  usage: 'maka {generate, g}:{collection, col} <name> [--where]',
  description: 'Generate scaffolding for a Collection.',
  examples: [
    'maka g:collection todos'
  ]
}, function (args, opts) {
  var context = {
    name: this.classCase(opts.resourceName),
    collectionName: this.classCase(opts.resourceName),
    where: opts.where
  };

  this.template(
    'collection/collection.js',
    this.pathFromApp('imports/startup', opts.appPathPrefix, 'collections', opts.dir, this.fileCase(opts.resourceName) + '.js'),
    context
  );

  var destPath = this.pathFromApp('imports/startup', opts.appPathPrefix, 'index.js');
  this.injectAtEndOfFile(destPath, '\nimport \'./collections/' + opts.dir + '/' + this.fileCase(opts.resourceName) + '.js\';');

  // just in to be sure we get the import file working
  this.createFile(this.pathFromApp('lib/main.js'), 'import \'/imports/startup/lib\';', {ignore: true});
});
