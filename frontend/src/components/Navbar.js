import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div class="nav">
                <NavLink to="/" class="logo nav-link">
                    <span><img src="/Logo.png" />Hotspotter</span>
                </NavLink>
                <NavLink to="/eligibility" activeClassName="active">Check eligibility</NavLink>
                <NavLink to="/clinics" activeClassName="active">Find a clinic</NavLink>
                <NavLink to="/submit" activeClassName="active">Submit a vaccine location</NavLink>
            </div>
        );
    }
}

export default Navbar;