import React, { useState } from "react";

const SignIn = () => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signInMessage, setSignInMessage] = useState('');
  const [registerData, setRegisterData] = useState({ email: '', username: '', password: '' });
  const [registerMessage, setRegisterMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/Accounts/SignIn', { //may need to update port#
        method: 'Post',
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
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/Accounts/Register', { //may need to update port#
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        setRegisterMessage(data.message);
      } else {
        setRegisterMessage('Unable to register');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setRegisterMessage('Unable to register');
    }
  };

  return (
    <div>
      <div>
        <h2>Sign In</h2>
        <input
        type="text"
        placeholder="Email"
        value={signInData.email}
        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
        />
        <br />
        <input 
        type="password"
        placeholder="Password"
        value={signInData.password}
        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
        />
        <br />
        <button onClick={handleSignIn}>Sign In</button>
        <p className={signInMessage ? 'error-message' : ''}>{signInMessage}</p>
      </div>
      <hr />
      <div>
        <h2>Register</h2>
        <input
        type="text"
        placeholder="Email"
        value={registerData.email}
        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
        <br />
        <input
        type="text"
        placeholder="Username"
        value={registerData.username}
        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
        <br />
        <input
        type="password"
        placeholder="Password"
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <br />
        <button onClick={handleRegister}>Register</button>
        <p className={registerMessage ? 'error-message' : ''}>{registerMessage}</p>
      </div>
    </div>
  );
};

export default SignIn;