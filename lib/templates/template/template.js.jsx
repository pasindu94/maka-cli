import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

/**
 * @namespace Client.Component.<%= className %>
 * @memberof Client.Component
 *
 * @class
 * @classdesc This is the root react component that will be wrapped
 * by the createContainer symbol.
 */
class <%= className %>Component extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillMount() {

    }

    // The main render function
    render() {
        return (<h2>Find me in <%= myPath %></h2>);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

/**
 * Define property types for each of the react component data context properties.
 * 
 * Refer to this site for more information on React PropTypes:
 * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 */
<%= className %>Component.propTypes = {};

/**
 * Set up the data context for our component
 * This is where we would create out Meteor.subscribe handler as
 * well as any other context properties that will need to be reactive.
 *
 * Refer to this page for more information on the createContainer symbol
 * https://atmospherejs.com/meteor/react-meteor-data
 */
export const <%= className %> = createContainer(({ params }) => {

    // Return our context to the react component.
    return {};

}, <%= className %>Component);
