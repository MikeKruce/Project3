// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const username = `${firstName} ${lastName}`;

    // Call the callback function passed as a prop to handle registration
    onRegister(username);

    // Redirect to the home page after successful registration
    navigate('/');
  };

  return (
    <div className="register-page">
      <header>
        <div className="logo-title">
          <img src={`${process.env.PUBLIC_URL}/Styles/images/logo.png`} alt="Art Studio Logo" className="logo" />
          <h1 className="gradient-text">
            <span>V</span><span>i</span><span>v</span><span>i</span><span>d</span> 
            <span>A</span><span>r</span><span>t</span> 
            <span>S</span><span>t</span><span>u</span><span>d</span><span>i</span><span>o</span>
          </h1>
        </div>
      </header>

      <div className="register-container">
        <h2>Create Your Account</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <label htmlFor="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required 
          />
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required 
          />
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
