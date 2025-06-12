import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/transitions/PageTransition';
import startPageImg from '../../img_start-page.png';
import img1 from '../../public/images/img1.jpg';
import img2 from '../../public/images/img2.jpg';
import imgChefTable from '../../img_chef-table.png';
import imgChefCloseup from '../../img_chef-closeup.png';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredImg, setHoveredImg] = useState(null); // null, 'img1', or 'img2'
  const [descVisible, setDescVisible] = useState(true);
  const [displayedImg, setDisplayedImg] = useState(null); // for cross-fade

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Custom smooth scroll function
  function smoothScrollToBottom(duration = 2500) {
    const start = window.scrollY || window.pageYOffset;
    const end = document.documentElement.scrollHeight;
    const distance = end - start;
    const startTime = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      const nextScroll = start + distance * ease;
      window.scrollTo(0, nextScroll);
      if (progress < 1 && Math.abs(window.scrollY - end) > 1) {
        requestAnimationFrame(scrollStep);
      } else {
        window.scrollTo(0, end); // Snap exactly to the bottom
      }
    }
    requestAnimationFrame(scrollStep);
  }

  // Descriptions
  const defaultDesc = "Step into our restaurant and discover a quiet place where quality sushi and thoughtful service come together.";
  const img1Desc = "Enjoy an elegant omakase experience in our exclusive restaurant setting or conveniently take your favorite sushi to go. Reserve a table for this evening.";
  const img2Desc = "Our legendary chef brings years of precision tradition and passion to every dish. From the knife to the plate each piece is a work of art.";

  // True cross-fade effect for description
  useEffect(() => {
    if (displayedImg !== hoveredImg) {
      setDescVisible(false);
      const timeout = setTimeout(() => {
        setDisplayedImg(hoveredImg);
        setDescVisible(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [hoveredImg, displayedImg]);

  return (
    <div className="main-bg">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">OMAKASE<br />EXPERIENCES</h1>
          <div className="hero-buttons">
            <PageTransition to="/menu">
              <button className="btn">VIEW MENU</button>
            </PageTransition>
            <PageTransition to="/reservation">
              <button className="btn btn-gold reserve-btn">RESERVE NOW</button>
            </PageTransition>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src={startPageImg} 
            alt="Sushi Hero" 
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        </div>
        <div className="scroll-cue" onClick={() => {
          smoothScrollToBottom(2500);
        }}>
          &#8595;
        </div>
      </section>
      <section className="welcome-section" id="menu">
        <h2 className="welcome-title">WELCOME TO SUSHI</h2>
        <p className={`welcome-desc${descVisible ? ' fade-in' : ' fade-out'}`}>
          {displayedImg === 'img1' && img1Desc}
          {displayedImg === 'img2' && img2Desc}
          {displayedImg === null && defaultDesc}
        </p>
        <div className="gallery">
          <div className="gallery-img">
            <img 
              src={imgChefTable} 
              alt="Chef at Table" 
              onMouseEnter={() => setHoveredImg('img1')}
              onMouseLeave={() => setHoveredImg(null)}
            />
          </div>
          <div className="gallery-img">
            <img 
              src={imgChefCloseup} 
              alt="Chef Closeup" 
              onMouseEnter={() => setHoveredImg('img2')}
              onMouseLeave={() => setHoveredImg(null)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 