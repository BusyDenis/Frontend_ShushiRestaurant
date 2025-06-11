import React from "react";
import hero from "/public/images/hero.jpg";
import img1 from "/public/images/img1.jpg";
import img2 from "/public/images/img2.jpg";

export default function App() {
  return (
    <div className="main-bg">
      <header className="navbar">
        <div className="logo">SUHI</div>
        <nav className="nav-links">
          <a href="#menu">MENÜ</a>
          <a href="#about">ÜBER UNS</a>
          <a href="#reservieren">RESERVIEREN</a>
        </nav>
      </header>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">OMAKASE<br />ERLEBNISSE</h1>
          <div className="hero-buttons">
            <a className="btn" href="#menu">MENÜ ANSEHEN</a>
            <a className="btn btn-gold" href="#reservieren">JETZT RESERVIEREN</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Sushi Hero" />
        </div>
      </section>
      <section className="welcome-section" id="menu">
        <h2 className="welcome-title">WILLKOMMEN BEI SUHI</h2>
        <p className="welcome-desc">
          Tauchen Sie ein in die Welt des traditionellen omakase-Genusses, wo jede Kreation die Frische und Kunstfertigkeit des japanischen Sushi-Handwerks zelebriert.
        </p>
        <div className="gallery">
          <div className="gallery-img"><img src={img1} alt="Zubereitung" /></div>
          <div className="gallery-img"><img src={img2} alt="Sushi Auswahl" /></div>
        </div>
      </section>
    </div>
  );
}
