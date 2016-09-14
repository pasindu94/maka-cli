import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// ✅ import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class <%= name %>Collection extends Mongo.Collection {
    // If you need to perform any custom actions on the data
    // before it's actually inserted, i.e. add a 'createdAt'
    // this -> <%= name %>Collection
    // super -> Mongo.Collection
    //
    //  i.e.:
    //  this.find(selector);
    //  super.insert(doc);
    //
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(selector, modifier) {
        const result = super.update(selector, modifier)
        return result;
    }

    remove(selector) {
        const ourDoc = this.find(selector).fetch();
        const result = super.remove(selector);
        return result;
    }
}

export const <%= name %> = new <%= name %>Collection('<%= name %>');

if (Meteor.isServer) {
    <%= name %>.allow({
        insert(userId, doc) {
            return false;
        },

        update(userId, doc, fieldNames, modifier) {
            return false;
        },

        remove(userId, doc) {
            return false;
        }
    });

    <%= name %>.deny({
        insert(userId, doc) {
            return true;
        },

        update(userId, doc, fieldNames, modifier) {
            return true;
        },

        remove(userId, doc) {
            return true;
        }
    });
}
