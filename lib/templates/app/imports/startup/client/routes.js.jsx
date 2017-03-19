import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

/**
 * The React Router client side routing definitions.
 * @namespace Client.Routes
 * @desc This is the main definition for the react router.
 */

import * as Component from './templates.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
        <Route path="*" component={ Component.MasterLayout }>
            <IndexRoute component={ Component.NotFound }/>
        </Route>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
