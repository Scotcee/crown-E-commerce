import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import HatsPage from './pages/hats/hats.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hats" element={<HatsPage />} />
    </Routes>
  );
}

export default App;
