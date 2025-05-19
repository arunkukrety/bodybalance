import React from 'react'; // required for JSX
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import DataPage from './pages/DataPage';
import { Home } from 'lucide-react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Import your global styles
import { WeightProvider } from './context/WeightContext';

export default function App() {
  return (
    <WeightProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </Router>
    </WeightProvider>
  );
}

