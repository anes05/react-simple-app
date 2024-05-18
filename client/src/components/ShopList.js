import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog'; // Ensure this is the correct path to your ConfirmDialog component

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Shops</h1>
      <button onClick={() => navigate('/shop/create')}>Create New Shop</button>
      <ul>
        {shops.map(shop => (
          <li key={shop.id}>
            {shop.shopName} - {shop.email}
            <button onClick={() => navigate(`/shop/edit/${shop.id}`)}>Edit</button>
            <button onClick={() => confirmDelete(shop.id)}>Delete</button>
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
