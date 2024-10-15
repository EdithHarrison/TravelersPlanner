import React from 'react';
import { Link } from 'react-router-dom';
import TodoContainer from '../../components/TodoContainer/TodoContainer';
import styles from './PackingList.module.css';
import bannerImage from '../../assets/home-banner.svg';
import travelersLogo from '../../assets/travelers-logo.svg';
import Navigation from '../Navigation/Navigation'; 

function PackingList() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.banner} style={{ backgroundImage: `url(${bannerImage})` }}>
        <header className={styles.header}>
          <img src={travelersLogo} alt="Travelers Planner Logo" className={styles.logo} />
          <Navigation /> 
        </header>
        <h1 className={styles.pageTitle}>PACKING CHECKLIST</h1>
      </div>
      <div className={styles.content}>
        <TodoContainer tableName="PackingList" />
      </div>
      
    </div>
  );
}

export default PackingList;