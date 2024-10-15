import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import homeBackgroundImage from '../../assets/home-background.svg';
import travelersLogo from '../../assets/travelers-logo.svg';
import timeToTravelImage from '../../assets/time-to-travel.svg';
import Navigation from '../Navigation/Navigation'; 

function HomePage() {
  return (
    <div className={styles.homePage} style={{ backgroundImage: `url(${homeBackgroundImage})` }}>
      <header className={styles.homeHeader}>
        <img src={travelersLogo} alt="Travelers Planner Logo" className={styles.homeLogo} />
        <Navigation /> 
      </header>

      <main className={styles.homeMain}>
        <div className={styles.homeImageSection}>
          <img src={timeToTravelImage} alt="Time to Travel the World" className={styles.homeMainImage} />
        </div>
        <div className={styles.homeContent}>
          <h1 className={styles.homeTitle}>Time to Travel the World</h1>
          <p className={styles.homeDescription}>
            Plan your upcoming trip with us for free! This digital planner enhances your travel experience with customizable itineraries, packing checklists, and budget trackers. It allows you to organize attractions, dining spots, and daily reflections while providing travel tips and cultural insights. Ideal for any journey, this planner is your perfect travel companion. Happy travels!
          </p>
          <Link to="/itinerary" className={styles.homeGetStartedBtn}>GET STARTED</Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;