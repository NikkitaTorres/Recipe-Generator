import React from 'react';
import '../Styles/Header.css';
import Logo from '../assets/Images/Rec.png'


function Header() {


  return (
    <header className="header">
      <div className='logo-container'>
        <img src={Logo} alt='Recipe Generator logo' className='logo'/>
      </div>
      <div className='menu'>
        <ul>
          <li>Home</li>
          <li>Sign In</li>
          <li></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;