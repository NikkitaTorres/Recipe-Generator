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
    <div className="flex justify-center items-center p-12">
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="font-bold text-2xl mb-4">Register</h2>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />
          <button className="bg-lime-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" onClick={handleRegister}>Register</button>
          <p className={`text-red-500 p-4 ${registerMessage ? 'block' : 'hidden'}`}>{registerMessage}</p>
        </div>
      </div>
    </div>

  );
};

export default Register;
