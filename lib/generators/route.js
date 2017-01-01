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

    var config = CurrentConfig.get() || {};
    
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

    if (config.engines.client === 'react') {
        name = this.classCase(name);
    } else {
        name = this.fullCamelCase(name);
    }

    var pathToTemplate = path.join(
        '/imports/ui/pages',
        opts.dir,
        this.fileCase(opts.resourceName),
        this.fileCase(opts.resourceName)
    );

    var context = {
        name: name,
        url: url,
        layout: opts.layout || "MasterLayout",
        templatePath: pathToTemplate,
        templateName: name
    };

    var destpath, content;
    if (config.engines.client === 'blaze') {
        destpath = this.rewriteDestinationPathForEngine(this.pathFromApp('imports/startup/client/routes.js'));
        content = this.templateContent('route/route.js', context);
        this.injectAtEndOfFile(destpath, '\n' + content);
    } else if (config.engines.client === 'react') {
        destpath = this.rewriteDestinationPathForEngine(this.pathFromApp('imports/startup/client/routes.jsx'));
        content = this.templateContent('route/route.js', context);
        this.injectIntoFile(destpath, '\n\t\t\t' + content + '\n\t\t\n', '<Router', '<Route');
    }


    var isOriginGen = (opts._ && opts._[0] === 'g:route');
    var configRoute = config.route || {};

    if (configRoute.template && isOriginGen && !opts.only) {
        Maka.findGenerator('template').invoke(args, opts);
    }
});
