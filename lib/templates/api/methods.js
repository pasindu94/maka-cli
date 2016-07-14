/**
 * Methods are highly app specific and as such Maka doesn't try
 * to implement any logic out of the box.  This file is simply to
 * provide a friendly reminder that you MAY need to have Methods.
 *
 * Also, it's a good idea to note that you may want to rate limit
 * your methods.
 *
 * Reference meteor's Todos app for more examples
 *
 * https://github.com/meteor/todos/blob/master/imports/api/lists/methods.js
 */

/*
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { <%= name %> } from './<%= fileName %>.js';

const insert = new ValidatedMethod({
    name: '<%= fileName %>.insert',
    validate: null,
    run(doc) {
        return <%= name %>.insert(doc);
    }
});
// Meteor.call('<%= fileName %>.insert', doc);

const update = new ValidatedMethod({
    name: '<%= fileName %>.update',
    validate: null,
    run([docId, obj]) {
        return <%= name %>.update(docId, {$set: obj});
    }
});
// Meteor.call('<%= fileName %>.update', [docId, {}]);

const remove = new ValidatedMethod({
    name: '<%= fileName %>.remove',
    validate: null,
    run(docId) {
        return <%= name %>.remove(docId);
    }
});
// Meteor.call('<%= fileName %>.remove', docId);

const RATE_LIMITED_METHODS = _.pluck([
    insert, update, remove
], 'name');

if (Meteor.isServer) {
    const OPERATIONS = 5;
    const PER_SECOND = 1 * 1000; // milliseconds
    // Only allow 5 list operations per connection per second.
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(RATE_LIMITED_METHODS, name);
        },

        // Rate limit per connection ID.
        connectionId() { return true; },
    }, OPERATIONS, PER_SECOND);
}
*/
