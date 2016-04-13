Generator.create({
  name: 'controller',
  aliases: ['c'],
  usage: 'maka {generate, g}:{controller, v} [path/]<name>',
  description: 'Generate scaffolding for a RouteController.',
  examples: [
    'maka g:controller todos/todos-index'
  ]
}, function (args, opts) {

  var config = CurrentConfig.get();

  var context = {
    name: this.classCase(opts.resourceName),
    comments: config.generator && config.generator.comments === 'true',
  };

  this.template(
    'controller/controller.js',
    this.pathFromApp(opts.appPathPrefix, 'controllers', opts.dir, this.fileCase(opts.resourceName) + '-controller.js'),
    context
  );
});
