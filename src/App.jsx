import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Itinerary from './pages/Itinerary/Itinerary';
import PackingList from './pages/PackingList/PackingList';
import BudgetTracker from './pages/BudgetTracker/BudgetTracker';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/packing-list" element={<PackingList />} />
            <Route path="/budget-tracker" element={<BudgetTracker />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>Edith Harrison 2024</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;