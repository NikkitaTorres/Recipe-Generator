import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import App from './App';
import OpenAi from './Components/OpenAi';
import Pantry from './Components/Pantry';
import Footer from './Components/Footer';
import SignIn from './Components/SignIn';
import Register from './Components/Register';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header />

    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/OpenAi" element={<OpenAi />} />
        <Route path="/App" element={<App />} />
        <Route path="/Pantry" element={<Pantry />} />
      </Routes>
      <Pantry />
    </React.StrictMode>
    <Footer />
  </Router>
);