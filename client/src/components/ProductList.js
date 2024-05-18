import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductList = () => {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/shop/${shopId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Products for Shop {shopId}</h1>
      <button onClick={() => navigate(`/shop/${shopId}/product/create`)}>Add Product</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.productName} - {product.description} - ${product.price} - {product.quantity}
            <button onClick={() => navigate(`/shop/${shopId}/product/edit/${product.id}`)}>Edit</button>
            <button onClick={() => navigate(`/shop/${shopId}/product/delete/${product.id}`)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
