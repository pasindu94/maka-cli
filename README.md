# maka

Meteor Apps Kick Ass! (maka)

Maka is a command line scaffolding tool for Meteor applications. Maka has been
adapted from EventedMind's iron-meteor to be compatible with Meteor 1.3.x.

It automatically creates project structure, files and boilerplate code.  You may use maka where ever you use meteor.

Maka works great on OSX, Linux, and Windows.

## Installation
Install the maka command line tool globally so you can use it from any project directory.

```sh
$ npm install -g maka-cli
```
## NOTICE
### Update 2.0.0

Maka version 2.0.0 HAS ARRIVED!
With it will brings FlowRouter as the default client side router and Restivus as the default server side router.  Version 2 "nearly" brings maka-cli inline with Meteor 1.3 guides and tutorials and embraces the ES6 standards of imports/exports.

This is a breaking change, and projects that still use IronRouter will not work well with maka v2.

I've created an npm package called "iron-maka"

``` $ npm install -g iron-maka ```

Iron-Maka will forever stay in version 1.x.x and you may use it as ``` $ iron-maka``` where ever you used maka.

There will be very minimal support for iron-maka, but as I do have a lot of projects that run on iron router, it's in my self interest to keep it working :D


### Update 1.3.0
I'm happy to announce that a new scaffolding generator has been released! This version brings in:

```  maka g:api Todos ``` 

What this will do is scaffold out an api "concept" that is closely aligned with Meteor 1.3 application
structure.  All the files generated will be located in the ``` /app/imports/api/<concept> ``` directory.

You will need to edit the methods.js, publications.js and api.js to explicitly expose the methods, publications and CRUD.

I encourage you to take a look at the Meteor Guide's application structure section for more information:
https://guide.meteor.com/structure.html


### Update 1.2.0

This version updates the collections scaffolding.  From the beginning of Meteor we've had to place collections as a global variable.  Now that Meteor 1.3 has support for export/import, we should be exporting the collections explicitly as constants.

No longer will ``` maka g:collection Todo ``` place the collection in the ```/app/lib``` directory.

Collections will now be placed by default in the ```/app/imports/startup/lib/collections``` directory and automatically exported and imported explicitly into the app.

Please note that for existing applications the first time you create a collection a file will be added: ```/app/lib/main.js``` that will explicitly import all of the ```/app/imports/lib``` directory.

Defining server or client side collections will also still work. (i.e. ```maka g:col Todo --where "server"```)

I know this isn't completely in line with the Meteor 1.3 application structure.  Many projects still use 1.2, and this is an effort to bring Maka closer to 1.3 while still keeping 1.2 applications relevant.


## Usage
Use the `help` command to get a list of the top level commands.

```
$ maka help
```

Use the `g` command to see a list of generators.

```
$ maka g
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
--skip-template-css=true|false       Don't generate CSS files when templates are made.
--skip-template-js=true|false        Don't generate JS files when templates are made.
--skip-template-html=true|false      Don't generate HTML files when templates are made.
--skip-flow-router                   Don't install flow-router. (route generators will be disabled in maka-cli)
--skip-route-template                Don't create templates with route generators.
```

### Run Your Application
```sh
$ maka run
```

or just
```sh
$ maka
```

### Generators
```sh
$ maka g:scaffold todos
$ maka g:template todos/todo_item
$ maka g:api cars
$ maka g:collection todos
$ maka g:route webhooks/stripe
$ maka g:route todos/show todos/:id
$ maka g:route todos/edit todos/:id/edit
$ maka g:publish todos
$ maka g:stylesheet main
$ maka g:package package:name
```

## Testing
```sh
$ maka --test
```

This may be used with --env to test prod settings as well as other options such as --port:

```sh
$ maka --test --env production --port 3010
```

Testing packages in isolation with jasmine has also been added:

```sh
$ maka --test-packages package-name
```

To prevent the install of this testing package use the param:
```sh
$ maka create package-name --skip-jasmine
```

If you don't have jasmine, and would like it in your existing app:
```sh
$ maka add sanjo:jasmine velocity:html-reporter.
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
  "environment": "/path/to/environment"
}
```

#### Initialize Meteor Up
Use `maka mupx` to run Meteor Up commands. To create a `mup.json` file for an environment run:

```sh
maka mupx <environment> --init
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

or, if you have DNS setup

$ heroku config:set ROOT_URL=https://www.<domain-name>.com
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

## Deploy Meteor App on CentOS
```sh
$ maka build --architecture os.linux.x86_32
or
$ maka build --architecture os.linux.x86_64

Copy the build to its final home on the CentOS box.

Update Yum:
	$ yum -y update

    Install EPEL
    $ yum -y install epel-release

    Install NodeJS and Npm:
    $ yum -y install nodejs npm

    Verify Node Version
    $ node --version

    Install MongoDB
    	1. Add the MongoDB Yum repo by editing mongodb.repo and adding in the definition:
    	$ vim /etc/yum.repos.d/mongodb.repo

            [mongodb]
            name=MongoDB repo
            baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
            gpgcheck=0
            enabled=1

        2. Install the MongoDB packages
            $ yum install mongodb-org

        3. Start MongoDB
            $ chkconfig mongod on
            $ service mongod start


The following environment variables should be modified to suit your needs.
$ export MONGO_URL='mongodb://localhost:27017/<dbName>'
$ export ROOT_URL='http://localhost'
$ export MAIL_URL='smtp://user:password@mailhost:port/'
$ export PORT=3000

$ (cd programs/server && npm install)

$ (cd to bundle root)
$ node main.js

```
## Directory Structure
The application will have the following directory structure:

```sh
my-app
├── app
│   ├── client
│   │   ├── head.html                      # Define your HTML heading here
│   │   ├── main.js                        # This is automatically loaded by meteor
│   ├── imports
│   │   ├── api                            # API Definitions go here
│   │   ├── startup
│   │   │   ├── client
│   │   │   │   ├── collections.js         # Collections are loaded from here
│   │   │   │   ├── index.js               # Client startup
│   │   │   │   ├── routes.js              # Flow-router routes are loaded here
│   │   │   │   └── templates.js           # page templates are loaded here
│   │   │   ├── lib
│   │   │   │   └── index.js
│   │   │   └── server
│   │   │       ├── fixtures.js            # Fixtures and server-specific logic
│   │   │       ├── index.js
│   │   │       └── register-api.js        # Server-only API are loaded here (publish methods)
│   │   └── ui
│   │       ├── components                 # Reusable UI component templates go here
│   │       ├── layouts
│   │       │   └── master-layouts
│   │       │       ├── master-layout.html # Define the master layout here
│   │       │       └── master-layout.js
│   │       └── pages                      # Application pages
│   │           ├── home.html
│   │           ├── home.css
│   │           └── home.js
│   ├── lib
│   │   ├── main.js
│   ├── packages
│   ├── private
│   ├── public
│   └── server
│       └── main.js
├── bin
├── build
│   └── README
└── config
    ├── development
    │   ├── env.sh
    │   └── settings.json
    └── production
        ├── env.sh
        └── settings.json

```


## License

The MIT License (MIT)
Copyright (C) 2016 Campbell Labs 

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

