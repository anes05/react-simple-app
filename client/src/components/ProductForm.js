import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const { shopId, productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    serialNumber: '',
    price: '',
    quantity: '',
    shopId: shopId,
  });

  useEffect(() => {
    if (productId) {
      // Fetch product data if editing an existing product
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = productId ? 'PUT' : 'POST';
      const url = productId ? `/api/products/${productId}` : `/api/products`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      navigate(`/shop/${shopId}/products`);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <h1>{productId ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={product.serialNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductForm;
