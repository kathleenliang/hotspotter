import React, { Component } from 'react';
import Map from './Map';
import ClinicCard from './ClinicCard';

const cards = [];

class ClinicPage extends Component {
    // access age with this.props.location.state.age
    // access postal code with this.props.location.state.postalCode
    // TODO: make a get request
    constructor(props) {
        super(props)
        this.state = { "render": "true" };
    }
    componentDidMount() {
        fetch('http://localhost:8000/clinic/clinics/', {
            method: "GET"
        }).then((response) => response.json())
            .then((data) => {
                data.Clinics.forEach((clinic) => {
                    let postalCode = this.props.location.state.postalCode.substr(0, 3)
                    if (clinic.postal_codes.split(",").includes(postalCode)) {
                        let url = "//" + clinic.url
                        cards.push(<ClinicCard
                            name={clinic.name}
                            address={clinic.address}
                            hours={clinic.hours}
                            phone={clinic.phone}
                            likes={clinic.likes}
                            dislikes={clinic.dislikes}
                            submitted_from={clinic.submitted_from}
                            url={url}
                        />)
                    }
                });
                this.setState({ "render": "false" });
            });
        
    }
    render() {
        return (
            <div class="clinic-page" >
                <div style={{ height: '100vh', width: '50%', float: "left" }}>
                    <div style={{ padding: '0 50px' }}>
                        <p style={{ fontFamily: 'Futura', fontSize: '28px', lineHeight: '30px' }}>Vaccine clinics near you</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div class="filter">&#x1F50E;&#xFE0E; Search</div>
                            <div class="filter">3km radius</div>
                            <div class="filter">Hours</div>
                        </div>
                        <div>
                            {/* need to fetch the data from the backend, loop it and output the clinic cards */
                                cards.map((card) => {
                                    return <div>{card}</div>
                                })
                            }
                            {/* <ClinicCard
                                name='Markham Heritage Health Clinic'
                                address='5970 16th Ave #128'
                                hours='9AM - 5PM'
                                phone='905-471-2967'
                                likes='16'
                                dislikes='0'
                                submitted_from='Twitter'
                            />
                            <ClinicCard
                                name='Markham Heritage Health Clinic'
                                address='5970 16th Ave #128'
                                hours='9AM - 5PM'
                                phone='905-471-2967'
                                likes='16'
                                dislikes='0'
                                submitted_from='Twitter'
                            /> */}
                        </div>
                    </div>
                </div>
                <Map postalCode = {this.props.location.state.postalCode}/>
            </div>
        );
    }
};

export default ClinicPage;