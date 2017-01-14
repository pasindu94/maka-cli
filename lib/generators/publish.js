var path = require('path');
var _ = require('underscore');

Generator.create({
    name: 'publish',
    aliases: ['p'],
    usage: 'maka {generate, g}:{publish, p} <name>',
    description: 'Generate scaffolding for a publish function.',
    examples: [
        'maka g:publish todos'
    ]
}, function (args, opts) {
    var config = CurrentConfig.get();
    var context = {
        name: opts.resourceName,
        collection: this.classCase(opts.resourceName)
    };

    var destpath = this.rewriteDestinationPathForEngine(this.pathFromApp('server/publish.' + config.engines.js));
    var content = this.templateContent('publish/publish.' + config.engines.js, context);
    this.injectAtEndOfFile(destpath, '\n' + content);
});
