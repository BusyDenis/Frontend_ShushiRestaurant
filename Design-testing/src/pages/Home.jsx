import React from "react";
import { Link } from "react-router-dom";
import hero from "/public/images/hero.jpg";
import img1 from "/public/images/img1.jpg";
import img2 from "/public/images/img2.jpg";

const Home = () => {
  return (
    <div className="main-bg">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">OMAKASE<br />EXPERIENCES</h1>
          <div className="hero-buttons">
            <Link className="btn" to="/menu">VIEW MENU</Link>
            <Link className="btn btn-gold" to="/reservation">RESERVE NOW</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Sushi Hero" />
        </div>
      </section>
      <section className="welcome-section" id="menu">
        <h2 className="welcome-title">WELCOME TO SUHI</h2>
        <p className="welcome-desc">
          Immerse yourself in the world of traditional omakase dining, where each creation celebrates the freshness and craftsmanship of Japanese sushi artistry.
        </p>
        <div className="gallery">
          <div className="gallery-img"><img src={img1} alt="Preparation" /></div>
          <div className="gallery-img"><img src={img2} alt="Sushi Selection" /></div>
        </div>
      </section>
    </div>
  );
};

export default Home; 