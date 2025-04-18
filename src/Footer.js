import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Olukosi Carpets</h3>
          <p>Quality carpets, mats, and canopies — wholesale and retail.</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>151 Station Road Idi-Seke, Osogbo</p>
          <p>Email: olukosicarpets@gmail.com</p>
          <p>Phone: +234 812 487 2665</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/order">Order</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/payment">Payment</a></li>
            <li><a href="/admin_login">Admin Login</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Olukosi Carpets. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
