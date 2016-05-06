# maka

Meteor Apps Kick Ass! (maka)

---
### Update 1.1.0
It's important to stay current with the Meteor file structure.  So with 1.3, I've included some of the lazy loaded ```imports/``` directory.  To start, and to keep things simple, only the ```imports/startup/``` with their build files (```server/index.js``` and ```client/index.js```) and the insertion points of ```app/client/main.js``` and ```app/server/main.js``` are included.

What this provides is more fine grained module imports.  See the official meteor [docs](http://guide.meteor.com/structure.html#example-app-structure) for more info.
 
---
Maka is a command line scaffolding tool for Meteor applications. Maka has been
adapted from EventedMind's iron-meteor.

Currently Maka was created from  a need for compatibility for Meteor 1.3.1.

It automatically creates project structure, files and boilerplate code.

## Installation
Install the maka command line tool globally so you can use it from any project directory.

```sh
$ npm install -g maka-cli
```

## Usage
Use the `help` command to get a list of the top level commands.

```
$ maka help
```

Use the `g` command to see a list of generators.

```
$ maka g
```

## Directory Structure
The application will have the following directory structure:

```sh
my-app/
 .maka/
   config.json
 bin/
 build/
 config/
   development/
     env.sh
     settings.json
 app/
   imports/		# Not loaded by Meteor, must be explicitly loaded via imports
   	 startup/
   	   client/
   	     index.js	# Meteor 1.3 client lazy load list
   	   server/
   	     index.js	# Meteor 1.3 server lazy load list
   	     fixtures.js
   client/
     collections/
     lib/
     stylesheets/
     templates/
     head.html
     main.js	# Files loaded LAST
   lib/
     collections/
     controllers/
     methods.js
     routes.js
   packages/
   private/
   public/
   server/
     collections/
     lib/
     methods.js
     publish.js
     bootstrap.js
     main.js 	# Files loaded LAST
```

## Generators
```sh
$ maka g:scaffold todos
$ maka g:template todos/todo_item
$ maka g:collection todos
$ maka g:route webhooks/stripe --where "server"
$ maka g:controller todos/show_todo
$ maka g:route todos/show_todo --action "show"
$ maka g:publish todos
$ maka g:stylesheet main
$ maka g:package package:name
```

## Commands

### Migrate from Iron-meteor
In the app directory:
```sh
$ maka migrate
```

### Create an Application
```sh
$ maka create my-app
```

The following parameters can be specified:
```
--skip-template-css=true|false
--skip-template-js=true|false
--skip-template-html=true|false
--skip-iron-router
--skip-route-controller
--skip-route-template
--skip-generator-comments
```



### Run Your Application
```sh
$ maka run
```

or just
```sh
$ maka
```

This will automatically load your config/development/env.sh and config/development/settings.json files.

### Run the Application with a Different Environment
```sh
$ maka run --env=staging
```

This will use the config files in `config/staging` instead.

### Debug Your Application on the Server Side
```sh
$ maka debug
```

### Build Your Application
```sh
$ maka build
```

### Connect to MongoDB Database
```sh
$ cd app/
$ meteor mongo
```

**NOTE** 

*Ideally running `maka mongo` in the project directory should work but it doesn't for some reason and is being tracked in issue #136*

## Deployment

### Deploy Your Application with Meteor Up
[Meteor Up](https://github.com/arunoda/meteor-up) is a command line tool to deploy any Meteor app to your own server.

#### Configure Meteor Up
The following configuration options are supported in `config.json`:

```
"mup": {
  "version": "mup" or "mupx",
  "environment": "/path/to/environment"
}
```

#### Initialize Meteor Up
Use `maka mup` to run Meteor Up commands. To create a `mup.json` file for an environment run:

```sh
maka mup <environment> --init
```

**IMPORTANT**

Your `mup.json` file must contain `"enableUploadProgressBar": false` to work with Maka.

#### Create Meteor Up Server
After [configuring](https://github.com/arunoda/meteor-up/#example-file) `mup.json`, the server can be bootstrapped with a single command:

```sh
maka mup <environment> --setup
```

#### Deploy to Meteor Up Envmakament
```
  'maka mup development' //deploy to development environment
  'maka mup dev' // shortcut for development
  'maka mup production'
  'maka mup prod'
  'maka mup <custom-from-config>'
```

### Deploy Your Application on Heroku
Maka projects require buildpacks to look for the app in /app/ in addition to the root for deployments to work. Currently there is a patched version of the Horse buildpack available that is compatible with Iron based projects. Use this fork until the patches has been added to the main Horse repo.

Initialize the git repo
```sh
$ git init
$ git add .
$ git commit -m 'init'
```

Create the heroku app:
```sh
$ heroku create <app-name>
```

Setup the build pack

```sh
$ heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
```

This will build your application and put the resulting bundle into the project's
build folder.

Setup MongoDB
```sh
$heroku addons:create mongolab
```
Configure your ROOT_URL
```sh
$ heroku config:set ROOT_URL=https://<app-name>.herokuapp.com
```
Depoy to heroku
```sh
$ git push heroku master
```

Enable sticky session-support
```sh
$ heroku labs:enable http-session-affinity
```

Set your settings path
```sh
$ heroku config:add METEOR_SETTINGS="$(cat config/production/settings.json)"
```

## Meteor Commands
Meteor commands will automatically be proxied to the meteor command line tool.

## Contributing
Contributions and ideas are welcome.

## Tests
To run tests
```sh
npm test
```

## License
MIT
