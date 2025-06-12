import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageTransition.css';

const PageTransition = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Create expanding circle at click position
    const circle = document.createElement('div');
    circle.className = 'transition-circle';
    circle.style.left = `${rect.left + rect.width / 2}px`;
    circle.style.top = `${rect.top + rect.height / 2}px`;
    
    document.body.appendChild(circle);
    
    // Start the expansion animation
    requestAnimationFrame(() => {
      circle.style.transform = 'scale(100)';
      circle.style.opacity = '1';
    });

    // Wait for expansion to complete before navigating
    setTimeout(() => {
      // Start fade out
      circle.style.opacity = '0';
      navigate(to);
      
      // Remove circle after fade out completes
      setTimeout(() => {
        if (circle.parentNode) {
          circle.parentNode.removeChild(circle);
        }
      }, 1000);
    }, 800);
  };

  return (
    <div onClick={handleClick} className="transition-button">
      {children}
    </div>
  );
};

export default PageTransition; 