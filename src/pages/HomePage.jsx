import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import homeBackgroundImage from '../assets/home-background.svg';
import travelersLogo from '../assets/travelers-logo.svg';
import timeToTravelImage from '../assets/time-to-travel.svg';

function HomePage() {
  return (
    <div className={styles.page} style={{ backgroundImage: `url(${homeBackgroundImage})` }}>
      <header className={styles.header}>
        <img src={travelersLogo} alt="Travelers Planner Logo" className={styles.logo} />
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/itinerary">Itinerary</Link>
          <Link to="/packing-list">Packing List</Link>
          <Link to="/budget-tracker">Budget Tracker</Link>
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img src={timeToTravelImage} alt="Time to Travel the World" className={styles.mainImage} />
        </div>
        <div className={styles.textSection}>
          <h1 className={styles.title}>Time to Travel the World</h1>
          <p className={styles.description}>
            This digital planner enhances your travel experience with customizable itineraries, packing checklists,
            and budget trackers. Happy travels!
          </p>
          <button className={styles.getStartedBtn}>Get Started</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Edith Harrison 2024</p>
      </footer>
    </div>
  );
}

export default HomePage;