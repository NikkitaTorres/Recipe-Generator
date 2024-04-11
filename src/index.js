import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Home from './Components/Home';
import App from './App';
import Pantry from './Components/Pantry';
import Footer from './Components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Home />
    <App />
    <Pantry />
    <Footer />
  </React.StrictMode>
);