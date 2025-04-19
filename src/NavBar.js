// src/components/NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Ensure you have this CSS file

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Olukosi Carpets</div>
      <div className="hamburger" onClick={toggleNav}>
        <span className={isOpen ? 'bar open' : 'bar'}></span>
        <span className={isOpen ? 'bar open' : 'bar'}></span>
        <span className={isOpen ? 'bar open' : 'bar'}></span>
      </div>
      <ul className={isOpen ? 'nav-links active' : 'nav-links'}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        <li><Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link></li>
        <li><Link to="/order" onClick={() => setIsOpen(false)}>Order</Link></li>
        <li><Link to="/payment" onClick={() => setIsOpen(false)}>Payment</Link></li>
        <li><Link to="/admin_login" onClick={() => setIsOpen(false)}>Admin Login</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
