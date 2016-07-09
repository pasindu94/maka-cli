var path = require('path');

var RouteGenerator = Generator.create({
  name: 'route',
  aliases: ['r'],
  usage: 'maka {generate, g}:{route, r} <url> <name> [--layout <layout>]',
  description: 'Generate scaffolding for a Route.',
  examples: [
    'maka g:route todos todosIndex',
    'maka g:route todos/:id/edit todosEdit',
    'maka g:route users/:id/show usersShow --layout userView'

  ]
}, function (args, opts) {
  if (args.length < 2) {
    this.logError("A URL and a route name is required.")
    throw new Command.UsageError;
  }
  var context = {
    name: args[1],
    url: opts._[1],
    layout: opts.layout || "MasterLayout" 
  };

  var destpath = this.rewriteDestinationPathForEngine(this.pathFromApp('imports/startup/client/routes.js'));
  var content = this.templateContent('route/route.js', context);
  this.injectAtEndOfFile(destpath, '\n' + content);


  var isOriginGen = (opts._ && opts._[0] === 'g:route');
  var config = CurrentConfig.get() || {};
  var configRoute = config.route || {};

  if (configRoute.template && isOriginGen)
    Maka.findGenerator('template').invoke(args, opts);

});
