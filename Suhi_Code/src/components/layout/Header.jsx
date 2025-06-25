import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavFadeLink = ({ to, children, className, instant }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    const fadeDiv = document.querySelector('.page-fade');
    if (instant) {
      navigate(to);
      return;
    }
    if (fadeDiv) {
      fadeDiv.classList.add('fade-out');
      setTimeout(() => {
        navigate(to);
        setTimeout(() => fadeDiv.classList.remove('fade-out'), 110);
      }, 90);
    } else {
      navigate(to);
    }
  };
  return (
    <a href={to} className={className} onClick={handleClick}>{children}</a>
  );
};

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="navbar">
      <NavFadeLink to="/" className="logo" instant>SUSHI</NavFadeLink>
      <nav className="nav-links">
        <NavFadeLink to="/" className={isActive('/')}>HOME</NavFadeLink>
        <NavFadeLink to="/menu" className={isActive('/menu')}>MENU</NavFadeLink>
        <NavFadeLink to="/reservation" className={isActive('/reservation')}>RESERVE</NavFadeLink>
        <NavFadeLink to="/account" className={isActive('/account')}>PROFILE</NavFadeLink>
      </nav>
    </header>
  );
};

export default Header; 