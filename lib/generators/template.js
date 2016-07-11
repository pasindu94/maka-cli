var path = require('path');
var _ = require('underscore');

Generator.create({
  name: 'template',
  aliases: ['t'],
  usage: 'maka {generate, g}:{template, t} [path/]<name> [--component] [--layout]',
  description: 'Generate scaffolding for a template.',
  examples: [
    'maka g:template todos/todos-item'
  ]
}, function(args, opts) {
  // Get the full name, not just the resource name
  var name = opts._[1];

  // Change slashes to camelCase
  // For example if the path is todos/edit, the route name will be todosEdit
  name = name.replace(/\//, "-");
  name = this.fullCamelCase(name);

  var projectPath = 'imports/ui/templates/pages';

  if(opts.component) {
    projectPath = 'imports/ui/templates/components';
  }
  if(opts.layout) {
    projectPath = 'imports/ui/templates/layouts';
  }
  if(opts.layout && opts.component) {
    this.logError("A template can not be a component and a layout at the same time.");
    throw new Command.UsageError();
  }

  var pathToTemplate = this.pathFromApp(
    projectPath,
    opts.dir,
    this.fileCase(opts.resourceName),
    this.fileCase(opts.resourceName)
  );



  var context = {
    name: name,
    myPath: path.relative(this.pathFromProject(), pathToTemplate),
    className: this.cssCase(name),
    fileName: this.fileCase(name)
  };
  var config = CurrentConfig.get();

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
  // Import the HTML and CSS
  this.injectAtBeginningOfFile(
    pathToTemplate + '.js',
    "import './" + opts.resourceName + "." + config.engines.html + "';\n" +
    "import './" + opts.resourceName + "." + config.engines.css + "';"
  );


  if (CurrentConfig.get().template.css) {
    this.template(
      'template/template.css',
      pathToTemplate + '.css',
      _.extend({}, context, { className: this.cssCase(opts.resourceName) })
    );
  }

});
