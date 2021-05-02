import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class EligiblePage extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false};

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({redirect: true});
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={{pathname: "/clinics", state: this.props.location.state }}/>;
        }

        return (
            <div>
                <img src="/GreenCheckmark.png" class="checkmark" />
                <div class="eligible-text">
                    You're eligible
                </div>
                <div class="eligible-description">Click the button below to find a clinic and start booking your appointment to get a vaccine.</div>
                <button class="submit-btn" onClick={this.onClick}>Find a clinic &#10132;</button>
            </div>
        );
    }
};

export default EligiblePage;