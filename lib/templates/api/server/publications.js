/**
 * Publications are highly app specific and as such Maka doesn't try
 * to implement any logic out of the box.  This file is simply to
 * provide a friendly reminder that you MAY need to have publications.
 */

/*
    import { Meteor } from 'meteor/meteor';
    import { <%= name %> } from '../<%= fileName %>.js';

    Meteor.publish('<%= fileName %>.public', function <%= camelCase %>Public() {
          return <%= name %>.find({
              userId: { $exists: false },
          }, {
              fields: <%= name %>.publicFields
          });
    });

    Meteor.publish('<%= fileName %>.private', function <%= camelCase %>Private() {
            if (!this.userId) {
                return this.ready();
            }

            return <%= name %>.find({
                userId: this.userId,
            }, {
                fields: <%= name %>.privateFields,
            });
    });
*/
