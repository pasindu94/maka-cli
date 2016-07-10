FlowRouter.route('<%= url %>', {
  name: '<%= name %>',
  action() {
    BlazeLayout.render('<%= layout %>', {yield: "<%= templateName %>"});
  }
});
