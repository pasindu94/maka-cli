import { Factory } from 'meteor/dburles:factory';
import { $ } from 'meteor/jquery';

if (Meteor.isClient) {
    // this import needs to be in the Meteor.isClient conditional
    // because meteor will try to import on the server too.
    import './<%= fileName %>.jsx';
    describe('<%= name %>', function () {
        it('has a failing test', function() {
            expect(1).toBe(0);
        });
    });
}
