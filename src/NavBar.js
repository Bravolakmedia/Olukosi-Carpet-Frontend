// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="logo">Olukosi Carpets</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><Link to="/admin_login">Admin Login</Link></li>
            </ul>
        </div>
    );
};

export default NavBar;

