var path = require('path');
var _ = require('underscore');

Generator.create({
  name: 'template',
  aliases: ['t'],
  usage: 'maka {generate, g}:{template, t} [path/]<name>',
  description: 'Generate scaffolding for a template.',
  examples: [
    'maka g:template todos/todos-item'
  ]
}, function(args, opts) {
  var pathToTemplate = this.pathFromApp(
    'client/templates',
    opts.dir,
    this.fileCase(opts.resourceName),
    this.fileCase(opts.resourceName)
  );

  var context = {
    name: this.classCase(opts.resourceName),
    myPath: path.relative(this.pathFromProject(), pathToTemplate),
    className: this.cssCase(opts.resourceName),
    fileName: this.fileCase(opts.resourceName)
  };

  this.template(
    'template/template.html',
    pathToTemplate + '.html',
    context
  );

  this.template(
    'template/template.js',
    pathToTemplate + '.js',
    context
  );

  if (CurrentConfig.get().template.css) {
    this.template(
      'template/template.css',
      pathToTemplate + '.css',
      _.extend({}, context, { className: this.cssCase(opts.resourceName) })
    );
  }

});
