import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navContainer}>
      {isMobile && (
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className={`${styles.navLinks} ${isMobile && isOpen ? styles.open : ''}`}>
        <Link to="/" className={location.pathname === "/" ? styles.active : ""} onClick={closeMenu}>HOME</Link>
        <Link to="/itinerary" className={location.pathname === "/itinerary" ? styles.active : ""} onClick={closeMenu}>ITINERARY</Link>
        <Link to="/packing-list" className={location.pathname === "/packing-list" ? styles.active : ""} onClick={closeMenu}>PACKING LIST</Link>
        <Link to="/budget-tracker" className={location.pathname === "/budget-tracker" ? styles.active : ""} onClick={closeMenu}>BUDGET TRACKER</Link>
      </div>
    </nav>
  );
};

export default Navigation;