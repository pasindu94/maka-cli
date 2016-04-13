Command.create({
  name: 'version',
  aliases: ['v'],
  usage: 'maka version',
  description: 'Return version number of Maka command line tool.',
  examples: [
    'maka v',
    'maka version'
  ]
}, function (args, opts) {
  if (args.length >= 1)
    throw new Command.UsageError;
  var name = args[0];
  var pjson = require('../../package.json');
  console.log(pjson.version);

  return true;
});
