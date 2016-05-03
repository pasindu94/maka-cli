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
    this.pathFromApp(opts.appPathPrefix, 'collections', opts.dir, this.fileCase(opts.resourceName) + '.js'),
    context
  );
});
