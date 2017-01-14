var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var MUP_COMMAND_DESCRIPTION = 'Deploy an app using maka and mupx. \n\n' +
    'You can set up a custom maka mupx deploy \n' +
    'command and project in .maka/config.json';

Command.create({
  name: 'mupx',
  usage: 'maka mupx <environment>',
  description: MUP_COMMAND_DESCRIPTION,
  examples: [
    'maka mupx dev --init',
    'maka mupx dev --setup',
    'maka mupx dev (Maps to development. Deploys the project.)',
    'maka mupx development',
    'maka mupx prod (Maps to production. Deploys the project.)',
    'maka mupx production',
    'maka mupx <custom-from-config>'
  ]
}, function (args, opts) {

  if (args.length < 1)
    throw new Command.UsageError;

  var config = CurrentConfig.withConfigFile(function() {
    return this.CurrentConfig.get();
  });

  var mupxConfig;
  var mupxConfigKeys;
  var destinationKey = args[0];
  var mupxVersion = 'mupx';

  if (config && config.mupx) {
    mupxConfig = config.mupx;
    mupxConfigKeys = _.keys(mupxConfig);
    if (mupxConfig.version) {
      mupxVersion = mupxConfig.version;
    }
  }

  if (destinationKey === 'dev')
    destinationKey = 'development';

  if (destinationKey === 'prod')
    destinationKey = 'production';

  // Let's not require any settings in the config file
  // If someone is coming from an older version of the CLI
  // they wont have those defaults set anyway
  // if (!_.contains(mupxConfigKeys, destinationKey))
  //   throw new Command.UsageError;



  // Default to config directory
  var destination = mupxConfig && mupxConfig[destinationKey] || 'config/' + destinationKey;
  var cwd = path.join(this.pathFromProject(), destination);

  var mupxCommand;

  if (opts.init) {
    if (this.isFile(destination + '/mup.json')) {
      this.logError("MUP already initialized.");
      return false;
    }
    if (this.isFile(destination + '/settings.json')) {
      if (!this.confirm("This will temporarily back up your settings.json file, and replace it after MUP is initialized. Continue?")) {
        return false;
      } else {
        fs.renameSync(destination + '/settings.json', destination + '/settings.bak');
      }
    }
    mupxCommand = mupxVersion + ' init';
  } else if (opts.setup) {
    mupxCommand = mupxVersion + ' setup';
  } else if (opts.reconfig) {
    mupxCommand = mupxVersion + ' reconfig';
  } else {
    mupxCommand = mupxVersion + ' deploy';
  }

  // Can we print the mupx stdout with execSync
  // while it's happening, instead of using the spinner?
  var spinHandle = this.logWithSpinner('Running ' + mupxCommand);

  try {
    this.execSync(mupxCommand, {cwd: cwd});
  } catch(e) {
    this.logError(e);
  } finally {
    spinHandle.stop();
    if (opts.init) {
      var mupxJson = fs.readFileSync(destination + '/mup.json', 'utf8');
      mupxJson = mupxJson.replace('"enableUploadProgressBar": true', '"enableUploadProgressBar": false');
      fs.writeFileSync(destination + '/mup.json', mupxJson);

      if (this.isFile(destination + '/settings.bak')) {
        fs.unlinkSync(destination + '/settings.json');
        fs.renameSync(destination + '/settings.bak', destination + '/settings.json');
      }
    }
  }

});
