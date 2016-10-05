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

    update(selector, callback) {
        const result = super.update(selector, modifier);
        return result;
    }

    remove(selector) {
        const ourDoc = this.find(selector).fetch();
        const result = super.remove(selector);
        return result;
    }
}

export const <%= name %> = new <%= name %>Collection('<%= name %>');

<%= name %>.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

<%= name %>.publicFields = {};
<%= name %>.privateFields = {};
