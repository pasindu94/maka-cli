Command.create({
  name: 'create',
  aliases: ['cr'],
  usage: 'maka create <name>',
  description: 'Create a new maka meteor project.',
  examples: [
    'maka create my-app'
  ]
}, function (args, opts) {
  if (args.length < 1)
    throw new Command.UsageError;
  var name = args[0];

  if (this.createDirectory(name)) {
    return Maka.findCommand('init').invoke(args, opts);
  } else {
    return false;
  }
});
