import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const getInfoWindowString = (clinic) => `
<div>
    <div style="font-size: 16px;">
        ${clinic.name}
    </div>
    <div style="font-size: 14px; color: grey;">
        ${clinic.address}
    </div>
    <div style="font-size: 14px; color: grey;">
        ${clinic.hours}
    </div>
    <div style="font-size: 14px; color: grey;">
        ${clinic.phone}
    </div>
</div>`;

const handleApiLoaded = (map, maps, props, clinics) => {
    const markers = [];
    const infowindows = [];
    clinics.forEach((clinic) => {
        try {
            let postalCode = props.postalCode.substr(0, 3)
            if (clinic.postal_codes.split(",") != null && clinic.postal_codes.split(",").includes(postalCode)) {
                let lat;
                let lng;
                const address = clinic.address;
                const newAddress = address.replace(" ", "+")
                fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + newAddress + "&key=AIzaSyBo5OGv3cOuH3JUggXwOuXrDRXYu-8fBLg")
                    .then((response) => response.json())
                    .then((data) => {
                        lat = parseFloat(data['results'][0]['geometry']['location']['lat']);
                        lng = parseFloat(data['results'][0]['geometry']['location']['lng']);
                        markers.push(new maps.Marker({
                            position: {
                                lat: lat,
                                lng: lng,
                            },
                            map,
                        }));
                        markers.forEach((marker, i) => {
                            marker.addListener('click', () => {
                                infowindows[i].open(map, marker);
                            });
                        });
                    });

                infowindows.push(new maps.InfoWindow({
                    content: getInfoWindowString(clinic),
                }));
            }
        } catch (err) {
            console.log(err)
        }
    });

};

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 43.9885,
            lng: -79.4704
        },
        zoom: 11
    };

    constructor(props) {
        super(props);

        this.state = {
            clinics: [],
        };
    }

    componentDidMount() {
        try {
            fetch('http://localhost:8000/clinic/clinics/', {
                method: 'GET',
                async: false
            }).then((response) => response.json())
                .then((data) => {
                    this.setState({ clinics: data.Clinics });
                });
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { clinics } = this.state;
        return (
            <div style={{ height: '100vh', width: '50%', float: "right" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBo5OGv3cOuH3JUggXwOuXrDRXYu-8fBLg" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, this.props, clinics)}
                />
            </div>
        );
    }
}

export default Map;