import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class EligibilityPage extends Component {
    constructor(props) {
        super(props);
        this.state = {postalCode: '', age: '', redirect: false};

        this.handlePostalChange = this.handlePostalChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.eligiblePostalCodes = ['M1B', 'M1C', 'M1E', 'M1G', 'M1H','M1J','M1K',
        'M1L','M1M','M1P','M1R','M1S','M1T','M1V','M1W','M1X','M2J','M2M','M2R','M3A',
        'M3C','M3H','M3J','M3K','M3L','M3M','M3N','M4A','M4H','M4X','M5A','M5B','M5N','M5V',
        'M6A','M6B','M6E','M6H','M6K','M6L','M6M','M6N','M8V','M9A','M9B','M9C','M9L','M9M','M9N',
        'M9P','M9R','M9V','M9W','L6E','L0J','L4B','L4E','L4H','L4J','L4K','L4L','L6A','L3S','L3T','L6B','L6C'];
    }

    handlePostalChange(event) {
        this.setState({postalCode: event.target.value});
    }

    handleAgeChange(event) {
        this.setState({age: event.target.value});
    }

    handleSubmit(event) {
        if (this.eligiblePostalCodes.includes(this.state.postalCode.substring(0, 3)) && this.state.age >= 18) {
            this.setState({ redirect: true });
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={{pathname: "/eligible", state: {age: this.state.age, postalCode: this.state.postalCode}}}/>;
        }
        return (
            <div>
                <div class="main-text">
                    Check your eligibility and find a clinic
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-fields">
                        <div>
                            <label>
                                Postal code
                                <input id="postalCode" name="postalCode" class="pc-input" type="text" value={this.state.postalCode} placeholder="L6E 1G5" onChange={this.handlePostalChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Age
                                <select id="age" name="age" value={this.state.age} onChange={this.handleAgeChange}>
                                    <option value=' ' />
                                    {Array.from({ length: 101}).map((opt, i) => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div class="submit-btn-container">
                        <input type="submit" value="Check eligibility" class="submit-btn" />
                    </div>
                </form>
                
            </div>
        );
    }
};

export default EligibilityPage;
