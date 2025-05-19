import React from 'react'; // required for JSX
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import DataPage from './pages/DataPage';
import { Home } from 'lucide-react';
import AIAnalysisPage from './pages/AIAnalysisPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Import your global styles
import { WeightProvider } from './context/WeightContext';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <WeightProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/ai-analysis" element={<AIAnalysisPage />} />
          </Routes>
        </Router>
      </WeightProvider>
    </UserProvider>
  );
}

