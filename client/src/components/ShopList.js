import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog'; // Ensure this is the correct path to your ConfirmDialog component
import '../styles/ShopList.css';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [shopToDelete, setShopToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('/api/shops/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        const data = await response.json();
        setShops(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch shops');
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/shops/deleteById/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete shop');
      }
      setShops(shops.filter(shop => shop.id !== id));
      setConfirmOpen(false);
    } catch (error) {
      setError('Failed to delete shop');
    }
  };

  const confirmDelete = (id) => {
    setShopToDelete(id);
    setConfirmOpen(true);
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="shop-list-container">
      <h1 className="shop-list-header">Shops</h1>
      <button className="create-button" onClick={() => navigate('/shop/create')}>Create New Shop</button>
      <ul className="shop-list">
        {shops.map(shop => (
          <li key={shop.id}>
            <span>{shop.shopName} - {shop.email}</span>
            <div>
              <button onClick={() => navigate(`/shop/edit/${shop.id}`)}>Edit</button>
              <button onClick={() => confirmDelete(shop.id)}>Delete</button>
              <button onClick={() => navigate(`/shop/${shop.id}/product/create`)}>Add Product</button>
              <button onClick={() => navigate(`/shop/${shop.id}/products`)}>View Products</button>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => handleDelete(shopToDelete)}
      />
    </div>
  );
};

export default ShopList;
