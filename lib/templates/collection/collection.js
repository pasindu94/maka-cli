import { Mongo } from 'meteor/mongo';

<% if (where === 'client') { -%>
export const <%= name %> = new Mongo.Collection(null);
<% } else { -%>
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
        return doc;
    }

    update(selector, callback) {
        return selector;
    }

    remove(selector) {
        return selector;
    }
}

export const <%= name %> = new Mongo.Collection('<%= name %>');
<% } %>

<% if (where !== 'server') { -%>
if (Meteor.isClient) {
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
<% } %>
