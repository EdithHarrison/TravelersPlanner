import React from 'react';
import { Link } from 'react-router-dom';
import TodoContainer from '../components/TodoContainer/TodoContainer';
import styles from './Itinerary.module.css';
import bannerImage from '../assets/home-banner.svg';
import travelersLogo from '../assets/travelers-logo.svg';

function Itinerary() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.banner} style={{ backgroundImage: `url(${bannerImage})` }}>
        <header className={styles.header}>
          <img src={travelersLogo} alt="Travelers Planner Logo" className={styles.logo} />
          <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/itinerary">Itinerary</Link>
            <Link to="/packing-list">Packing List</Link>
            <Link to="/budget-tracker">Budget Tracker</Link>
          </nav>
        </header>
        <h1 className={styles.pageTitle}>TRAVEL ITINERARY</h1>
      </div>
      <div className={styles.content}>
        <TodoContainer tableName="Itinerary" />
      </div>
    </div>
  );
}

export default Itinerary;