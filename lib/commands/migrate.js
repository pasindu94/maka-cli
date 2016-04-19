var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var del = require('delete');

Command.create({
  name: 'migrate',
  usage: 'migrate',
  description: 'Migrate to the new maka project structure.'
}, function (args, opts) {
  var self = this;

  if (!this.isDirectory('.iron')) {
    this.logError("You can only run this command from the root of an old iron project with a .iron folder.");
    return false;
  } else {
    fs.rename('.iron', '.maka');
  }

  this.logSuccess("Okay you should be good to go.");

  return true;
});
