import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/**
 * The React Router client side routing definitions.
 * @namespace Client.Routes
 * @desc This is the main definition for the react router.
 * The comments that say "DONT CHANGE ME" (yes, no apostrophe)
 * should not be moved.  Seriously. Don't.  They allow maka to
 * know where to plot the new routes when you make them.
 */

import { MasterLayout } from '/imports/ui/layouts/master-layout/master-layout.jsx';
import { NotFound } from '/imports/ui/pages/not-found/not-found.jsx';

Meteor.startup( () => {
  render( 
    <Router history={ browserHistory }>

        <Route path="*" component={ NotFound } />
    </Router>, 
    document.getElementById( 'react-router' ) 
  );
});
