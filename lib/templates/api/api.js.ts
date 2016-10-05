// For advanced usage of Restivus by Nimble such as
// route permissions, checkout:
// https://github.com/kahmali/meteor-restivus/

import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { <%= name %> } from './<%= fileName %>.ts';

const <%= name %>ApiV1 = new Restivus({
    version: 'v1',
    useDefaultAuth: true,
    prettyJson: Meteor.isDevelopment
});

// Representational State (REST) endpoints disabled by default.
// Uncommenting below will expose ALL routes for <%= name %>
//
// Please review restivus documentation on how to harden endpoints.
//
// USE WITH CAUTION... can you imagine - $ maka g:api BankRecords
// <%= name %>ApiV1.addCollection(<%= name %>);
