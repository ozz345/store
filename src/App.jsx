import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import db from './firebase'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';

import './App.css'
import MainNav from './comps/MainNav';

import Customers from './Pages/Customers';
import Products from './Pages/Products';
import Purchases from './Pages/Purchases';
import Editproduct from './Pages/Editproduct';
import Editcustumer from './Pages/Editcustumer';
import Addproduct from './Pages/Addproduct';
import Addcustumer from './Pages/Addcustumer';
import Homepage from './Pages/Homepage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      const q = query(collection(db, 'Products'));
      onSnapshot(q, (qSnapshot) => {
        const products = qSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            status: 'UNCHANGED',
          };
        });
        dispatch({ type: 'LOAD', payload: products });
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const q = query(collection(db, 'Customers'));
      onSnapshot(q, (qSnapshot) => {
        const customers = qSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            status: 'UNCHANGED',
          };
        });
        dispatch({ type: 'LOADCUST', payload: customers });
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const q = query(collection(db, 'Purchases'));
      onSnapshot(q, (qSnapshot) => {
        const Purchases = qSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: 'LOADPURECHASES', payload: Purchases });
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const q = query(collection(db, 'total'));
      onSnapshot(q, (qSnapshot) => {
        const total = qSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch({ type: 'LOADTOTAL', payload: total[0].total2 });
      });
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <MainNav />

      <main className="main-content">
<Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/editcustumer" element={<Editcustumer />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/products" element={<Products />} />
          <Route path="/editproduct" element={<Editproduct />} />
          <Route path="/add-product" element={<Addproduct />} />
          <Route path="/addcustumer" element={<Addcustumer />} />
          <Route path="/" element={<Homepage />} />
</Routes>
      </main>
</div>
  );
}

export default App;







