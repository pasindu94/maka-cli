Generator.create({
  name: 'stylesheet',
  usage: 'maka {generate, g}:stylesheet [path/]<name>',
  description: 'Generate a stylesheet',
  examples: [
    'maka g:stylesheet todos/todos_item'
  ]
}, function(args, opts) {
  var pathFromApp = this.pathFromApp(
    'imports/ui/stylesheets',
    opts.dir,
    this.fileCase(opts.resourceName)
  );

  var context = {
    name: this.cssCase(opts.resourceName),
  };

  this.template(
    'stylesheet/stylesheet.css',
    pathFromApp + '.css',
    context
  );
});
