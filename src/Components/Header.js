import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import '../Styles/Header.css';
import Logo from '../assets/Images/Rec.png'



function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    window.location.href = '/signin';
  }

  const handleSignOut = () => {
    setIsSignedIn(false);
  }


  return (
    <header className="header">
      <div className='logo-container'>
        <img src={Logo} alt='Recipe Generator logo' className='logo' />
      </div>
      <div className='menu'>
      <Link to="/">
          <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Home</button>
        </Link>
        {isSignedIn ? (
          <>
          <Link to="/pantry">
            <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Pantry</button>
          </Link>
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