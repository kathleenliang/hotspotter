import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 43.9885,
            lng: -79.4704
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '50%', float: "right"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBo5OGv3cOuH3JUggXwOuXrDRXYu-8fBLg" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={43.9885}
                        lng={-79.4704}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;