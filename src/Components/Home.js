import React from "react";
import 'tailwindcss/tailwind.css';
import OpenAi from './OpenAi';


function Home() {
	const handleSignIn = () => {
		window.location.href = '/SignIn';
	}
  const handleRegister = () => {
		window.location.href = '/Register';
	}
  const handleOpenAi = () => {
    window.location.href = 'OpenAi';
  }
  return (
    <div className="bg-yellow-200 min-h-screen flex items-center justify-center">
    <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg sm:text-sm md:text-base lg:text-lg xl:text-xl" id="description">
      <h1 className="font-archivo-ital-bold text-4xl mb-4">Welcome to "What's in the Pantry" - Your Recipe Generator</h1>
      <p className="text-lg text-gray-900 mb-4">Have you ever found yourself staring into your pantry, wondering what you can possibly make with the ingredients you have on hand? Say goodbye to that dilemma with "What's in the Pantry"! Our website is your go-to destination for whipping up delicious meals using the ingredients you already have.</p> 
      <h2 className="text-2xl mb-2">How It Works: </h2>
      <p className="text-lg text-gray-900 mb-4">Simply input the items you currently have in your pantry, whether it's basics like pasta and canned tomatoes, or specialty items like spices and condiments. Our intelligent recipe generator will then work its magic, scouring our extensive database to suggest mouthwatering recipes tailored to your available ingredients.</p>
      <h2 className="text-2xl mb-2">Get Started Today:</h2>
      <p className="text-lg text-gray-900 mb-4">Join our community of home cooks and culinary enthusiasts and let "What's in the Pantry" transform your cooking experience. Say goodbye to mealtime monotony and hello to culinary creativity!</p>
      <div className="flex space-x-4">
          <button className="bg-lime-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleRegister}>Create Account</button>
        
          <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"onClick={handleSignIn}>Login</button>
          <button className="bg-amber-700 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleOpenAi}>Take me to the Recipe Generator</button>
        </div>
    </div>
    </div>
  );
}
export default Home;