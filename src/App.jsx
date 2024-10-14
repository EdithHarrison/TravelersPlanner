import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Itinerary from './pages/Itinerary';
import PackingList from './pages/PackingList';
import BudgetTracker from './pages/BudgetTracker';
import './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/packing-list" element={<PackingList />} />
        <Route path="/budget-tracker" element={<BudgetTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;