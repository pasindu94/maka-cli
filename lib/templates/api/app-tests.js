/* eslint-env jasmine */

import { Meteor } from 'meteor/meteor';
import { <%= name %> } from './<%= fileName %>.js';


if (Meteor.isServer) {
  describe('<%= name %>', () => {
      it('has been defined', () => {

      });
  });
}
