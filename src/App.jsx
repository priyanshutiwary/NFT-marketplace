import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './component/Landing';
import Home from './component/Home';
import Explore from './component/Explore';
import Sell from './component/Sell';
import Create from './component/Create';

const App = () => {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/Create" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;

