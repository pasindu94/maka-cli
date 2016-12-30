var path = require('path');

var RouteGenerator = Generator.create({
    name: 'route',
    aliases: ['r'],
    usage: 'maka {generate, g}:{route, r} [path/]<name> [url]',
    description: 'Generate scaffolding for a Route.',
    examples: [
        'maka g:route todosIndex todos',
        'maka g:route todosEdit todos/:id/edit',
        'maka g:route usersShow users/:id/show --layout userView',
        'maka g:route lists/listIndex lists',
    ]
}, function (args, opts) {
    var config = CurrentConfig.get();
    
    // Get the full name, not just the resource name
    var name = this.fileCase(opts.resourceName);

    // If no URL was specified, use /<name>
    var url = path.join('/', name);
    if(args.length > 1) {
        url = path.join('/', args[1]);
    }
    // Change slashes to camelCase
    // For example if the path is todos/edit, the route name will be todosEdit
    name = name.replace(/\//, "-");
        name = this.fullCamelCase(name);

    var pathToTemplate = path.join(
        '/imports/ui/pages',
        opts.dir,
        this.fileCase(opts.resourceName),
        this.fileCase(opts.resourceName)
    );

    var context = {
        name: name,
        url: url,
        layout: "MasterLayout",
        templatePath: pathToTemplate,
        templateName: name
    };

    var destpath = this.rewriteDestinationPathForEngine(this.pathFromApp('imports/startup/client/routes.js'));
    var content = this.templateContent('route/route.js', context);
    if (config.engines.client === 'blaze') {
        this.injectAtEndOfFile(destpath, '\n' + content);
    } else if (config.engines.client === 'react') {
        this.injectIntoFile(destpath, '\n' + content + '\n', '/<IndexRoute/g', '/}>/g');
    }


    var isOriginGen = (opts._ && opts._[0] === 'g:route');
    var config = CurrentConfig.get() || {};
    var configRoute = config.route || {};

    if (configRoute.template && isOriginGen && !opts.only) {
        Maka.findGenerator('template').invoke(args, opts);
    }
});
