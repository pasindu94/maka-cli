import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/imports/ui/templates/pages/default.js';
import '/imports/ui/templates/layouts/master-layouts/master-layout.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('MasterLayout', {yield: "defaultPage"});
  },
});
