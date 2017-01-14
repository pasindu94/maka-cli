/*****************************************************************************/
/* <% if (where !== 'server') { %> Client and<% } %> Server Methods */
/*****************************************************************************/

Meteor.methods({
  '<%= name %>'() {
    <% if (where !== 'server') { %>
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    <% } %>// server method logic
  }
});
