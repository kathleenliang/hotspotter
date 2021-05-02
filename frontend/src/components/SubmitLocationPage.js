import React, { Component } from 'react';

class SubmitLocationPage extends Component {
    render() {
        return (
            <div>
                <div class="main-text">Know of a vaccine location?</div>
                <div class="submit-description">Fill out the form below to add the location to our database. Let’s get everyone vaccinated together!</div>
                <div class="center">
                    <input class="search-input" type="text" value="" placeholder="&#x1F50E;&#xFE0E; Search with Google"/>
                </div>
                <form class="submit-form">
                    <div class="submit-subtitle">Location Information</div>
                    <div class="submit-form-fields">
                        <div class="submit-label-section">
                            <label class="submit-label">
                                Name of location
                                <br />
                                <input id="name" name="name" class="pc-input" type="text"/>
                                <span class="info">Enter the name of location. E.g. Applegrove community center</span>
                            </label>
                        </div>
                        <div class="submit-label-section">
                            <label class="submit-label">
                                Address Line
                                <br />
                                <input id="address" name="address" class="pc-input" type="text"/>
                                <span class="info">Apartment number/Suite, Street number, Street name</span>
                            </label>
                        </div>
                    </div>
                    <div class="submit-form-fields">
                        <div class="submit-label-section">
                            <label class="submit-label">
                                City
                                <br />
                                <input id="city" name="city" class="pc-input" type="text"/>
                                <span class="info">City, locality.</span>
                            </label>
                        </div>
                        <div class="submit-label-section">
                            <label class="submit-label">
                                Zip code
                                <br />
                                <input id="postalCode" name="postalCode" class="pc-input" type="text"/>
                                <span class="info">Enter your postal code. E.g. H9B 1Y7.</span>
                            </label>
                        </div>
                    </div>
                    <div class="submit-subtitle">Provide proof of vaccination</div>
                    <div class="submit-vax">Acceptable proof of vaccination includes screenshots of post-vaccine emails or photos post-vaccine of paper mail. </div>
                    <div class="left">
                    <label class="file-btn">
                        <input type="file"/>
                        Choose file
                    </label>
                    </div>
                    <div>
                    <span class="info">Upload photos of proof of your vaccination. Max file size is 50 MB.</span>
                    </div>
                    <div class="submit-btn-container">
                        <input type="submit" value="Submit" class="submit-btn" />
                    </div>
                </form>
            </div>
        );
    }
};

export default SubmitLocationPage;