import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to Our App</h1>
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToRegister}>Register</button>
    </div>
  );
};

export default HomePage;
