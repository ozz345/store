import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import db from '../firebase';
import {
  setDoc,
  doc,
} from 'firebase/firestore';


const Addcustumer = () => {
  const [obj, setObj] = useState({
    firstname: '',
    lastname: 0,
    city: ''
  });
  const [customId, setCustomId] = useState('');

  const dispatch = useDispatch();
  const nav = useNavigate();
  const custumers = useSelector((state) => state.Customers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!customId.trim()) {
        alert('Please enter a product ID');
        return;
      }

      // Check if product ID already exists in Redux store
      const existingCustum = custumers.find(product => product.id === customId);
      if (existingCustum) {
        alert('A custumer with this ID already exists. Please choose a different ID.');
        return;
      }

      // Create the product with custom ID
      const custumerWithId  = {
        ...obj
      };

      // Use setDoc to create document with custom ID
      await setDoc(doc(db, 'Customers', customId), custumerWithId);

      // Update Redux state
      dispatch({
        type: 'ADD_CUSTUM',
        payload: custumerWithId
      });

      nav('/products');
    } catch (error) {
      console.error('Error adding custumer:', error);
      alert('Error adding custumer. Please try again.');
    }
  };

  return (
    <div className="edit-customer-container">
      <div className="edit-customer-header">
        <h2>Add New Custumer</h2>
      </div>

      <form onSubmit={handleSubmit} className="edit-customer-form">
        <div className="form-group">
          <label htmlFor="productId">Custumer ID</label>
          <input
            type="text"
            id="productId"

            onChange={(e) => setCustomId(e.target.value)}
            placeholder="Enter unique product ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="first name">First Name</label>
          <input
            type="text"
            id="name"

            onChange={(e) => setObj({ ...obj, firstname: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last name">Last Name</label>
          <input
            type="text"
            id="price"

            onChange={(e) => setObj({ ...obj, lastname: e.target.value })}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="quantity"

            onChange={(e) => setObj({ ...obj, city: e.target.value })}
            required
            min="0"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="button-primary">Add Custumer</button>
          <button type="button" className="button-secondary" onClick={() => nav('/products')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Addcustumer;


