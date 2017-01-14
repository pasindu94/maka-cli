var path = require('path');
var Table = require('cli-table');
var _ = require('underscore');
var util = require('util');
var cli = require('cli-color');
var Fiber = require('fibers');

Command.create({
  name: 'generate',
  aliases: ['g'],
  usage: 'maka {generate, g}:<generator> <name> [--dir] [--where]',
  description: 'Generate different scaffolds for your project.',
  examples: [
    'maka generate:scaffold todos',
    'maka g:scaffold todos',
    'maka g:template todos/todo_item',
    'maka g:package package:name',
    'maka g:controller todos/todo_item --where "server"'
  ],

  onUsage: function () {
    var header = cli.blackBright;
    var table = new Table({});

    console.log(header('Generators:'));

    var generators = _.sortBy(Maka._generators, function (g) {
      return g.name;
    });

    _.each(generators, function (g) {
      table.push([
        g.name,
        g.description()
      ])
    });

    console.log(table.toString());
  }
}, function (args, opts) {
  var self = this;
  var gName = args[0];

  // Invoke the specified generator
  var generator = Maka.findGenerator(gName);
  if (!generator)
    throw new Command.UsageError;
  generator.run(args.slice(1), opts);
});
