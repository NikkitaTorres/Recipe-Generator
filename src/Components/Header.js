import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import '../Styles/Header.css';
import Logo from '../assets/Images/Rec.png'



function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSignIn = () => {
    window.location.href = '/signin';
  }

  const handleSignInSuccess = (name) => {
    setIsSignedIn(true);
    setUserName(name);
    console.log('Signed in successfully:', userName);
  }

  const handleSignOut = () => {
    setIsSignedIn(false);
  }


  return (
    <header className="header">
      <div className='logo-container mb-4 md:mb-0'>
        <img src={Logo} alt='Recipe Generator logo' className='logo' />
      </div>
      <div className='menu flex flex-col m-2 md:flex-row items-end md:items-center justify-end'>
      <Link to="/">
          <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Home</button>
        </Link>
        {isSignedIn ? (
          <>
          <Link to="/pantry">
            <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Pantry</button>
          </Link>
          {userName && <p>Welcome, {userName}!</p>}
          <button onClick={handleSignOut} className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Sign Out</button>
          
        </>
      ) : (
        <button onClick={handleSignIn} className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Sign In</button>
      )}
      </div>
    </header>
  );
}

export default Header;