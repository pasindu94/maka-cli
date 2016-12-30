import { Factory } from 'meteor/dburles:factory';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
    // this import needs to be in the Meteor.isClient conditional
    // because meteor will try to import on the server too.
    import './<%= fileName %>.js';
    describe('<%= name %>', function () {
        it('has a failing test', function() {
            expect(1).toBe(0);
        });
    });
}
