import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'

const HomePage = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="header">Welcome to Our App</h1>
      <button className="button" onClick={goToLogin}>Login</button>
      <button className="button" onClick={goToRegister}>Register</button>
    </div>
  );

};

export default HomePage;
