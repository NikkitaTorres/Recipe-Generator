import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Header />
    <Home />
    <Footer />
  </React.StrictMode>
);

