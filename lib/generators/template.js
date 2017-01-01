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

  var projectPath = 'imports/ui/pages';
  if(opts.component) {
    projectPath = 'imports/ui/components';
  }
  if(opts.layout) {
    projectPath = 'imports/ui/layouts';
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

  if (config.engines.html === 'blaze') {
    pathToTemplate = '/imports/startup/client/routes';
  } 

  var context = {
    name: this.fullCamelCase(opts.resourceName),
    myPath: path.relative(this.pathFromProject(), pathToTemplate),
    cssCaseName: this.cssCase(opts.resourceName),
    className: this.classCase(opts.resourceName),
    fileName: this.fileCase(opts.resourceName)
  };
  var config = CurrentConfig.get();

  if (opts.layout) {
      if (config.template.html) {
          this.template(
              'layout/layout.html',
              pathToTemplate + '.html',
              context
          );
      }

      this.template(
          'layout/layout.js',
          pathToTemplate + '.js',
          context
      );
  } else {
      if (config.template.html) {
          this.template(
              'template/template.html',
              pathToTemplate + '.html',
              context
          );
      }

      this.template(
          'template/template.js',
          pathToTemplate + '.js',
          context
      );

      if (config.template.test) {
          this.template(
              'template/template-app-tests.js',
              pathToTemplate + '.app-tests.js',
              context
          );
      }
  }
  // Import the HTML and CSS
  this.injectAtBeginningOfFile(
      pathToTemplate + "." + config.engines.js,
      "import './" + this.fileCase(opts.resourceName) + "." + config.engines.html + "';\n" +
      "import './" + this.fileCase(opts.resourceName) + "." + config.engines.css + "';"
  );


  if (CurrentConfig.get().template.css) {
    this.template(
      'template/template.css',
      pathToTemplate + '.css',
      _.extend({}, context, { className: this.cssCase(opts.resourceName) })
    );
  }
  // Add the template to templates.js
  var templateJSPath = this.rewriteDestinationPathForEngine(this.pathFromApp('imports/startup/client/templates.js'));
  // Import the template in the templates.js file
  var appPathToTemplate = path.join(
    '/' + projectPath,
    opts.dir,
    this.fileCase(opts.resourceName),
    this.fileCase(opts.resourceName)
  );

  this.injectAtEndOfFile(
    templateJSPath,
    "\nimport '" + appPathToTemplate + "." + config.engines.js + "';"
  );

});
