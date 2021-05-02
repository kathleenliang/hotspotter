import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div class="nav">
                <Link to="/" class="logo nav-link">
                    <span><img src="/Logo.png" />Hotspotter</span>
                </Link>
                <Link to="/eligibility" class="nav-link">Check eligibility</Link>
                <Link to="/clinics" class="nav-link">Find a clinic</Link>
                <Link to="/submit" class="nav-link">Submit a vaccine location</Link>
            </div>
        );
    }
}

export default Navbar;