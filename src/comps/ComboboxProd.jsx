import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import ComboboxProdchild from './ComboboxProdchild';
import Custumersviewchildforcustumer from './Custumersviewchildforcustumer';
import Purchasesview from './Purchasesview';
import db from '../firebase';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

import { v4 as uuid } from "uuid"





const ComboboxProd = () => {
  const products = useSelector((state) => state.Products);

  const custumers = useSelector((state) => state.Customers);
  const total = useSelector((state) => state.total);
  const total2 = total+1
  const dispatch = useDispatch();

  const [custname, setCustname] = useState()


  const [prodname, setProdname] = useState()
  const [prodid, setProdid] = useState()
  const product = products.filter((n) => n.name=== prodname);
  const custumer = custumers.filter((n) => n.firstname === custname)



  const unique_id = uuid();






  const id = (e) => {
    setProdname(e.target.value)

    const product = products.filter((n) => n.name=== e.target.value);

    console.log(product);


    sessionStorage.id = product[0].id;

console.log(sessionStorage.id);

  };














  const buy = async () => {
    try {
      // Get the current product
      const currentProduct = products.find(p => p.name === prodname);

      if (!currentProduct) {
        alert('Please select a product first');
        return;
      }

      if (currentProduct.quantity <= 0) {
        alert('This product is out of stock');
        return;
      }

      var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      const obj = {
        id: unique_id,
        productid: currentProduct.id,
        customerid: custumer[0].id,
        date: date,
        custumername: custumer[0].firstname,
        lastname: custumer[0].lastname,
        city: custumer[0].city,
        productname: currentProduct.name,
        price: currentProduct.price,
        quantity: currentProduct.quantity
      };

      setProdid(currentProduct.id);

      // Update product quantity in Firestore
      const productRef = doc(db, "Products", currentProduct.id);
      await updateDoc(productRef, {
        quantity: currentProduct.quantity - 1,
        custumers: arrayUnion({
          name: custumer[0].firstname,
          lastname: custumer[0].lastname,
          city: custumer[0].city,
          date: date,
          customeridprod: unique_id,
          customerid: custumer[0].id
        })
      });

      // Add purchase to Purchases collection
      await addDoc(collection(db, 'Purchases'), obj);

      // Update total
      await updateDoc(doc(db, 'total', 'ZPc7E3XajxbJh3LH8ptn'), { total2 });

      // Update Redux state
      dispatch({ type: 'ADDPURCHASES', payload: obj });
      dispatch({
        type: 'UPDATE_PRODUCT_QUANTITY',
        payload: {
          id: currentProduct.id,
          quantity: currentProduct.quantity - 1
        }
      });
      dispatch({ type: 'ADDPURCHASESTOPRODUCT', payload: obj });

      // Reset form
      setProdname('');
      setCustname('');

      // Show success message
      alert('Purchase completed successfully');
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('Error processing purchase. Please try again.');
    }
  };


  return (
    <>
      <div className="select-group">
        <div className="select-container">
          <label className="select-label">Choose a Customer:</label>
          <select onChange={(e)=>setCustname(e.target.value)} defaultValue=''>
            <option value={''}>Select Customer</option>
            {custumers.map((custom, index) => {
              return <Custumersviewchildforcustumer key={index} custom={custom} />;
            })}
          </select>
        </div>

        <div className="select-container">
          <label className="select-label">Choose a Product:</label>
          <select onChange={id} defaultValue=''>
            <option value={''}>Select Product</option>
            {products.map((prod, index) => {
              return <ComboboxProdchild key={index} prod={prod} />;
            })}
          </select>

        </div>
        <button onClick={buy}>Buy</button>
      </div>





    </>
  );
};

export default ComboboxProd;



