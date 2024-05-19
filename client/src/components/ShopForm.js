import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ShopForm.css';

const ShopForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState({ shopName: '', email: '', address: '', numtel: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchShop = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/shops/findById/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch shop');
          }
          const data = await response.json();
          setShop(data);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch shop data');
          setLoading(false);
        }
      };

      fetchShop();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop({ ...shop, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = id
        ? await fetch(`/api/shops/updateById/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(shop),
          })
        : await fetch('/api/shops/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(shop),
          });

      if (!response.ok) {
        throw new Error('Failed to save shop');
      }

      navigate('/shops');
    } catch (error) {
      setError('Failed to save shop');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="shop-form-container">
      <h1 className="shop-form-header">{id ? 'Edit Shop' : 'Create Shop'}</h1>
      <form className="shop-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Shop Name:
            <input
              type="text"
              name="shopName"
              value={shop.shopName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={shop.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={shop.address}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              name="numtel"
              value={shop.numtel}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );

};

export default ShopForm;
