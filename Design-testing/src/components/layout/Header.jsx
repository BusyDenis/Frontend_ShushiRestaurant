import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">SUHI</Link>
      <nav className="nav-links">
        <Link to="/" className={isActive('/')}>HOME</Link>
        <Link to="/menu" className={isActive('/menu')}>MENU</Link>
        <Link to="/reservation" className={isActive('/reservation')}>RESERVE</Link>
        <Link to="/dashboard" className={isActive('/dashboard')}>DASHBOARD</Link>
      </nav>
    </header>
  );
};

export default Header; 