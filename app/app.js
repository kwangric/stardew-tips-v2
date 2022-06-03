/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home'
import CropsInfo from './components/CropsInfo'
import VillagersInfo from './components/VillagersInfo'
import FishInfo from './components/FishInfo'
import BundlesInfo from './components/BundlesInfo'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link className="nav-item" to="/"><p>Home</p></Link>
          <Link className="nav-item" to="/crops">Crops</Link>
          <Link className="nav-item" to="/villagers">Villagers</Link>
          <Link className="nav-item" to="/fish">Fish</Link>
          <Link className="nav-item" to="/bundles">Bundles</Link>
        </nav>
        <main>
          <h1>
            Welcome to Stardew Tips!
          </h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crops" element={<CropsInfo />} />
            <Route path="/villagers" element={<VillagersInfo/>} />
            <Route path="/fish" element={<FishInfo/>} />
            <Route path="/bundles" element={<BundlesInfo/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
