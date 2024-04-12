import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({ email: "", username: "", password: "" });
  const [registerMessage, setRegisterMessage] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async () => {
    try {
      const response = await fetch('https://localhost:5001/Accounts/register', {
        method: 'POST', // Corrected method case
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        setRegisterMessage(data.message);
        navigate('/pantry');
      } else {
        setRegisterMessage('Unable to register');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setRegisterMessage('Unable to register');
    }
  }

  return (
    <div className="text-center">
      <h2 className="font-bold text-2xl">Register</h2>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
      </div>
      <button className="bg-lime-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleRegister}>Register</button>
      <p className={registerMessage ? 'error-message' : ''}>{registerMessage}</p>
    </div>
  );
};

export default Register;


// const handleAddIngredient = async () => {

//   try {
//     const response = await fetch('http://localhost:5000/Ingredient/addIngredient', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(ingredientName),
//     });

//     if (response.ok) {
//       console.log('Ingredient added successfully');
   
//     } else {
//       console.log('Failed to add ingredient');
     
//     }
//   } catch (error) {
//     console.log('An error occurred while adding ingredient:', error);
    
//   }
// };