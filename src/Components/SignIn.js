import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pantry from './Pantry';



const SignIn = ({ onSignInSuccess }) => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signInMessage, setSignInMessage] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); 

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://localhost:5001/Accounts/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData),
      });
      console.log(signInData); //remove line before submitting code.
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSignInMessage(`Welcome, ${data.name}`);
        setUserName(data.name);
        if (onSignInSuccess) {
          onSignInSuccess(data.name);
        }
        navigate('/Pantry');
      } else {
        setSignInMessage('Unable to sign in');
      }
    } catch (error) {
      console.error('Error signing in:', error); //remove line
      setSignInMessage('Unable to sign in');
    }
  }

  return (
    <div className="flex justify-center items-center p-12">
      <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
      <h2 className="font-bold text-2xl text-center mb-4">Sign In</h2>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="text"
          placeholder="Email"
          value={signInData.email}
          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
        />
        <br />
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="password"
          placeholder="Password"
          value={signInData.password}
          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
        />
        <br />
      </div>
      <button className="bg-lime-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" onClick={handleSignIn}>Sign In</button>
      <p className={signInMessage ? 'error-message' : ''}>{signInMessage}</p>{userName && <p>Welcome, {userName}!</p>}
    </div>
    </div>
    </div>
  );
};

export default SignIn;