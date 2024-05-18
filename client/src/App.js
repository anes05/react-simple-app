import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ShopList from './components/ShopList';
import ShopForm from './components/ShopForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/shops" element={<ShopList />} />
          <Route path="/shop/create" element={<ShopForm />} />
          <Route path="/shop/edit/:id" element={<ShopForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
