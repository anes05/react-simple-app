import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numtel, setNumtel] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, numtel }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      setUsername('');
      setEmail('');
      setPassword('');
      setNumtel('');
      setError(null);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-header">Register</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              value={numtel}
              onChange={(e) => setNumtel(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );

};

export default RegistrationForm;
