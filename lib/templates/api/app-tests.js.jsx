/* eslint-env jasmine */

import { Meteor } from 'meteor/meteor';
import { <%= name %> } from './<%= fileName %>.jsx';


if (Meteor.isServer) {
  describe('<%= name %>', () => {
      it('has been defined', () => {
          let isDefined = false;
          if(<%= name %>) {
            isDefined = true;
          }

          expect(isDefined).toBe(true);
      });
  });
}
