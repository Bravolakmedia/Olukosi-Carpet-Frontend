// src/Home.js
import React from 'react';

const Home = () => {
    return (
        <div className="hero">
  <div className="hero-content">
    <h1>Welcome to Olukosi Carpets</h1>
    <p>Explore our premium collection of carpets, canopies, mats & more – all at wholesale & retail prices.</p>
    <button className="cta-btn" onClick={() => window.location.href = "/gallery"}>
      Browse Gallery
    </button>
  </div>
</div>

        
    );
};

export default Home;
