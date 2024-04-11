import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import UserProfile from './Components/UserProfile';
import SignIn from './Components/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header />
    <React.StrictMode>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
      <UserProfile />
    </React.StrictMode>
    <Footer />
  </Router>
);