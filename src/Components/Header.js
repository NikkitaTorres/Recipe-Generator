import React from 'react';
import '../Styles/Header.css';


function Header() {
  return (
    <header className='header'>
      <div className='logo-container'>
        <img src='../assets/images/Rec.png' alt='Recipe Generator logo' className='logo'/>
        <h1 className='site-title'>What's in the Pantry</h1>
      </div>

    </header>
  )
}

export default Header;