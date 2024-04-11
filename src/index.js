import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Home from './Components/Home';
import App from './App';
import Footer from './Components/Footer';
import UserProfile from './Components/UserProfile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Home />
    {/* <App /> */}
    <UserProfile />
    <Footer />
  </React.StrictMode>
);