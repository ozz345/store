import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainNav.css';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="main-nav">
      <div className="nav-brand">
      <Link to="/" onClick={() => setIsOpen(false)}>Store Management</Link>
      </div>

      <button className="nav-toggle" onClick={toggleMenu}>
        <span className="hamburger"></span>
      </button>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
        <Link to="/customers" onClick={() => setIsOpen(false)}>Customers</Link>
        <Link to="/purchases" onClick={() => setIsOpen(false)}>Purchases</Link>
      </div>
    </nav>
  );
};

export default MainNav;