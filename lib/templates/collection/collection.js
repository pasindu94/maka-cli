<% if (where === 'client') { -%>
<%= name %> = new Mongo.Collection(null);
<% } else { -%>
<%= name %> = new Mongo.Collection('<%= collectionName %>');
<% } %>

<% if (where !== 'server') { -%>
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
<% } %>
