import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Home from './Components/Home';
import App from './App';
import Footer from './Components/Footer';
import UserProfile from './Components/UserProfile';
import  { SignIn }  from './Components/SignIn.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <SignIn/>
    <Home />
    {/* <App /> */}
    <UserProfile />
    <Footer />
  </React.StrictMode>
);