import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import TestComponent from './components/TestComponent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/test" element={<TestComponent />} />
          </Routes>
        </div>
        <footer>
          <div className="container">
            &copy; {new Date().getFullYear()} Blog Hub - Made by Avnish Sinha. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
