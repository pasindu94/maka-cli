import { Meteor } from 'meteor/meteor';
import { <%= name %> } from './<%= fileName %>.js';

/*
// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    if (<%= name %>.find().count() === 0) {
        // If you want to keep your fixtures in a central location:
        // const data = Assets.getText('<%= fileName %>.json');

        // or define them here:
        const data = [ {} ];

        data.forEach((datum) => {
            <%= name %>.insert(datum);
        });
    }
});
*/
