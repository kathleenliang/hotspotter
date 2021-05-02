import React, { Component } from 'react';
import Map from './Map';

class ClinicPage extends Component {
    // access age with this.props.location.state.age
    // access postal code with this.props.location.state.postalCode
    // TODO: make a get request
    render() {
        return (
            <div>
                <Map />
            </div>
        );
    }
};

export default ClinicPage;