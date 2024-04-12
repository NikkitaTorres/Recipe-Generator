import React from 'react';
import '../Styles/Header.css';
import Logo from '../assets/Images/Rec.png'


function Header() {


  return (
    <header className="header">
      <div className='logo-container'>
        <img src={Logo} alt='Recipe Generator logo' className='logo' />
      </div>
      <div className='menu'>
        <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Home</button>
        <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Pantry</button>
      </div>
    </header>
  );
}

export default Header;