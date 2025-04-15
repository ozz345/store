import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import db from '../firebase';
import {
  deleteDoc,
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import Custumersviewforedit from '../comps/Custumersviewforedit';

const Editproduct = () => {
  const [obj, setObj] = useState({
    name: sessionStorage.name,
    price: sessionStorage.price,
    quantity: sessionStorage.quantity,
    status: 'Editprod'
  });

  const dispatch = useDispatch();
  const nav = useNavigate();
  const products = useSelector((state) => state.Products);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get current product data to preserve custumers array
      const currentProduct = products.find(p => p.id === sessionStorage.id);
      const updatedProduct = {
        ...obj,
        id: sessionStorage.id,
        custumers: currentProduct?.custumers || []
      };

      // Create a batch for all update operations
      const batch = writeBatch(db);

      // Update product document
      const productRef = doc(db, 'Products', sessionStorage.id);
      batch.update(productRef, updatedProduct);

      // Get and update all related purchases
      const purchasesQuery = query(
        collection(db, 'Purchases'),
        where('productname', '==', sessionStorage.name)
      );
      const purchasesSnapshot = await getDocs(purchasesQuery);

      // Store updated purchases for Redux
      const updatedPurchases = [];

      purchasesSnapshot.forEach((purchaseDoc) => {
        const purchaseData = purchaseDoc.data();
        const updatedPurchase = {
          ...purchaseData,
          productname: obj.name,
          productprice: obj.price,
          id: purchaseDoc.id
        };
        updatedPurchases.push(updatedPurchase);
        batch.update(doc(db, 'Purchases', purchaseDoc.id), {
          productname: obj.name,
          productprice: obj.price
        });
      });

      // Commit all updates
      await batch.commit();

      // Update Redux state for both Products and Purchases
      dispatch({
        type: 'UPDATE_PRODUCT_AND_PURCHASES',
        payload: {
          productId: sessionStorage.id,
          updatedProduct: updatedProduct,
          updatedPurchases: updatedPurchases
        }
      });

      nav('/products');
    } catch (error) {
      console.error('Error updating product and related data:', error);
    }
  };

  const del = async () => {
    try {
      // Create a batch for all delete operations
      const batch = writeBatch(db);

      // Delete product document
      batch.delete(doc(db, 'Products', sessionStorage.id));

      // Get and delete all related purchases
      const purchasesQuery = query(
        collection(db, 'Purchases'),
        where('productname', '==', sessionStorage.name)
      );
      const purchasesSnapshot = await getDocs(purchasesQuery);

      // Store purchase IDs to update Redux state
      const purchaseIds = [];

      purchasesSnapshot.forEach((purchaseDoc) => {
        purchaseIds.push(purchaseDoc.id);
        batch.delete(doc(db, 'Purchases', purchaseDoc.id));
      });

      // Get remaining purchases count for total update
      const allPurchasesQuery = query(collection(db, 'Purchases'));
      const allPurchasesSnapshot = await getDocs(allPurchasesQuery);
      const remainingPurchasesCount = allPurchasesSnapshot.docs.length - purchasesSnapshot.docs.length;

      // Update total in Firebase
      batch.update(doc(db, 'total', 'ZPc7E3XajxbJh3LH8ptn'), {
        total2: remainingPurchasesCount
      });

      // Commit all deletions and updates
      await batch.commit();

      // Update Redux state for both Products and Purchases
      dispatch({
        type: 'DELETE_PRODUCT_AND_PURCHASES',
        payload: {
          productId: sessionStorage.id,
          purchaseIds: purchaseIds
        }
      });

      // Update Redux total
      dispatch({ type: 'UPDATE_TOTAL', payload: remainingPurchasesCount });

      nav('/products');
    } catch (error) {
      console.error('Error deleting product and related data:', error);
    }
  };

  const cancele = () => {
    nav('/products');
  };

  return (
    <div className="edit-customer-container">
      <div className="edit-customer-header">
        <h2>Edit Product: {sessionStorage.name}</h2>
        <span className="customer-id">ID: {sessionStorage.id}</span>
      </div>

      <form onSubmit={handleSubmit} className="edit-customer-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            defaultValue={sessionStorage.name}
            onChange={(e) => setObj({ ...obj, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            defaultValue={sessionStorage.price}
            onChange={(e) => setObj({ ...obj, price: +e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            defaultValue={sessionStorage.quantity}
            onChange={(e) => setObj({ ...obj, quantity: +e.target.value })}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="button-primary">Save Changes</button>
          <button type="button" className="button-danger" onClick={del}>Delete Product</button>
          <button type="button" className="button-secondary" onClick={cancele}>Cancel</button>
        </div>
      </form>

      <div className="purchases-section">
        <h2>Customer Purchase History - {sessionStorage.name}</h2>
        <Custumersviewforedit name={sessionStorage.name} />
      </div>
    </div>
  );
};

export default Editproduct;






    // data.forEach((prod) => {
    //   switch (prod.status) {
    //     case 'Editprod': {
    //       setId(prod.id)
    //       setObj2({name: prod.name, price: prod.price, quantity:prod.quantity })
    //       break;
    //     }
    //     // case 'DELETED': {
    //     //   deleteDoc(doc(db, 'cars', car.id));
    //     //   break;
    //     // }
    //   }
    // });


    // if (obj.name = false)  {
    //   alert('Last name is mandatory');
    // }


    //   const save = async () => {


// console.log(id);
// console.log(obj2);


//     await updateDoc(doc(db, 'Products', sessionStorage.id), obj);


//     // const prodtoeditinfirebasr = data.filter((prod) => prod.status = 'EDITFIREBASE')



//     nav('/products')


//     // if (obj.name = false)  {
    //   alert('Last name is mandatory');
    // }
//   };


