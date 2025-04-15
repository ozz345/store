import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import {
  setDoc,
  doc,
} from 'firebase/firestore';

const Addproduct = () => {
  const [obj, setObj] = useState({
    custumers: [],
    name: '',
    price: 0,
    quantity: '',
    status: 'Editprod'
  });
  const [customId, setCustomId] = useState('');

  const dispatch = useDispatch();
  const nav = useNavigate();
  const products = useSelector((state) => state.Products);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!customId.trim()) {
        alert('Please enter a product ID');
        return;
      }

      // Check if product ID already exists in Redux store
      const existingProduct = products.find(product => product.id === customId);
      if (existingProduct) {
        alert('A product with this ID already exists. Please choose a different ID.');
        return;
      }

      // Create the product with custom ID
      const productWithId = {
        ...obj
      };

      // Use setDoc to create document with custom ID
      await setDoc(doc(db, 'Products', customId), productWithId);

      // Update Redux state
      dispatch({
        type: 'ADD_PRODUCT',
        payload: productWithId
      });

      nav('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div className="edit-customer-container">
      <div className="edit-customer-header">
        <h2>Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="edit-customer-form">
        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            id="productId"

            onChange={(e) => setCustomId(e.target.value)}
            placeholder="Enter unique product ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"

            onChange={(e) => setObj({ ...obj, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"

            onChange={(e) => setObj({ ...obj, price: +e.target.value })}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"

            onChange={(e) => setObj({ ...obj, quantity: +e.target.value })}
            required
            min="0"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="button-primary">Add Product</button>
          <button type="button" className="button-secondary" onClick={() => nav('/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Addproduct;


