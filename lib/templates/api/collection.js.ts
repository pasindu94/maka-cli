import { Mongo } from 'meteor/mongo';

/**
 * Extension of the Mongo.Collection in order to expose
 * useful class method hooks to modify or manipulate data
 * before invoking the super class's methods.
 *
 * @memberof Server.<%= name %>
 * @extends Mongo.Collection
 */
class <%= name %>Collection extends Mongo.Collection {
    /**
     * @public
     * @param { object } doc The document to inserted.
     * @param { object } callback The callback from invocation.
     * @returns { string } The _id of the new doc.
     */
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    /**
     * @public
     * @param { object | string } selector The mongodb selector.
     * @param { object } modifier The mongodb modifier.
     * @returns { string } The _id of the document updated.
     * */
    update(selector, callback) {
        const result = super.update(selector, modifier);
        return result;
    }

    /**
     * @public
     * @param { object | string } selector The mongodb selector.
     * @returns { string } The _id of the document being removed.
     */
    remove(selector) {
        const ourDoc = this.find(selector).fetch();
        const result = super.remove(selector);
        return result;
    }
}
/**
 * The MongoDB collection object that is exported and made available
 * to the server.  Client access is restricted, and may only access this
 * collection (by default) via server side Meteor Methods.
 * You may modify (not recommended) these permissions on the <%= name %>.deny() line.
* @memberof Server.<%= name %>
* @member <%= name %>
*/
export const <%= name %> = new <%= name %>Collection('<%= name %>');

/**
 * Set the client side access rights to the Cases collection.
 * Default: Deny all
 */
<%= name %>.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

/**
 * Set the default public and private field selectors.
 * @see ./publications.js
 */
<%= name %>.publicFields = {};
<%= name %>.privateFields = {};
