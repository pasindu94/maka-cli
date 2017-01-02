var path = require('path');

var MethodGenerator = Generator.create({
    name: 'methods',
    aliases: ['m'],
    usage: 'maka {generate, g}:{methods, m} name [--where]',
    description: 'Generate scaffolding for a Method.',
    examples: [
        'maka g:methods todos --where "server"'
    ]
}, function (args, opts) {
    var config = CurrentConfig.get();

    var context = {
        name: path.join(opts.appPathPrefix, this.fileCase(opts.resourceName)),
        where: opts.where
    };

    // todo: logic to either create a file or append a method

    this.template(
        'methods/methods.js',
        this.pathFromApp(opts.appPathPrefix, 'methods' + '.' + config.engines.js),
        context
    );

});
