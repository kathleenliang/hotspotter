import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div class="nav">
                <Link to="/" class="logo">
                    <span><img src="/Logo.png" />Hotspotter</span>
                </Link>
                <Link to="/eligibility">Check eligibility</Link>
                <Link to="/clinics">Find a clinic</Link>
                <Link to="/submit">Submit a vaccine location</Link>
            </div>
        );
    }
}

export default Navbar;