// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Loginpage from './components/Loginpage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Loginpage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;


