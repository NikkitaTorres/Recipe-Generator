import React from 'react';
import '../Styles/Footer.css';
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="container mx-auto text-center">
      <p>&copy; 2024 What's in the Pantry. All rights reserved.</p>
      <div className="flex items-center justify-center" >
        <p></p>✨Made by Team Fantastic Four
      <div className="ml-2">
          <a href="https://github.com/NikkitaTorres/Recipe-Generator.git">
          <FaGithub 
          size={20}/>
          </a>
        </div>
        ✨</div>
    </div>

  );
}

export default Footer;