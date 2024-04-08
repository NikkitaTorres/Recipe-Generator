import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './Components/Home';
import Footer from './Components/Footer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Home />
    <Footer />
  </React.StrictMode>
);

