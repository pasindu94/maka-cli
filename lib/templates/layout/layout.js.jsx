/**
 * @namespace Client.Templates.<%= className %>
 * @memberof Client.Layouts
 */

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

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
        return (
            <div>
                { this.props.children }
            </div>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

export const <%= className %> = createContainer(({ params }) => {

    // Return our context to the react component.
    return {};

}, <%= className %>Component);

