/**
 * Methods are highly app specific and as such Maka doesn't try
 * to implement any logic out of the box.  This file is simply to
 * provide a friendly reminder that you MAY need to have Methods.
 *
 * Also, it's a good idea to note that you may want to rate limit
 * your methods.
 *
 * Reference meteor's Todos app sample for more example on methods
 *
 * https://github.com/meteor/todos/blob/master/imports/api/lists/methods.js
 *
 * You'll need to install ValidteMethod and SimpleSchema
 *
 * $ maka add mdg:validated-method aldeed:simple-schema
 */


 /*

    import { Meteor } from 'meteor/meteor';
    import { ValidatedMethod } from 'meteor/mdg:validated-method';
    import { SimpleSchema } from 'meteor/aldeed:simple-schema';
    import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
    import { _ } from 'meteor/underscore';

    import { <%= name %> } from './<%= fileName %>.js';

     export const insert = new ValidatedMethod({
         name: '<%= fileName %>.insert',
         validate: new SimpleSchema({}).validator(),
         run() {
             return <%= name %>.insert({});
         }
     });

     const RATE_LIMITED_METHODS = _.pluck([
         insert
     ], 'name');

     if (Meteor.isServer) {
            // Only allow 5 list operations per connection per second.
            DDPRateLimiter.addRule({
                name(name) {
                    return _.contains(RATE_LIMITED_METHODS, name);
                },

                // Rate limit per connection ID.
                connectionId() { return true; },
            }, 5, 1000);
        }

 */
