import React, { useState } from "react";


const SignIn = () => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signInMessage, setSignInMessage] = useState('');


  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/Accounts/SignIn', { //may need to update port#
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSignInMessage(data.message);
        window.location.href = '/';
      } else {
        setSignInMessage('Unable to sign in');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setSignInMessage('Unable to sign in');
    }
  }

// add a border around input div
  return (
    <div id="input" className="text-center ">
      <h2 className="font-bold text-2xl">Sign In</h2>
      <div className="mb-4">
        <input
          className="shadow appearance-none border border-color rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Email"
          value={signInData.email}
          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
        />
        <br />
      </div>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          value={signInData.password}
          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
        />
        <br />
      </div>
      <button className="bg-lime-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSignIn}>Sign In</button>
      <p className={signInMessage ? 'error-message' : ''}>{signInMessage}</p>
    </div>
  );
};

export default SignIn;