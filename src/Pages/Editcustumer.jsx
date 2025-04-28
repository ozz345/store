import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import db from '../firebase';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  getDocs,
  writeBatch,
  where,
} from 'firebase/firestore';
import Productforedit from '../comps/Productforedit';







const Editcustumer = () => {

  const [obj, setObj] = useState({ firstname: sessionStorage.firstname, lastname: sessionStorage.lastname, city:  sessionStorage.city });
  const [obj2, setObj2] = useState();
  const [persons, setPersons] = useState();


  const dispatch = useDispatch();
  const nav = useNavigate()



  useEffect(() => {

    const fetchData = async () => {

      const q = query(collection(db, 'Purchases'));
      onSnapshot(q, (querySnapshot) => {
        setPersons(
          querySnapshot.docs.map((doc) => {
            // console.log(querySnapshot);
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        )


        ;
      });

    };
    fetchData();

  }, []);


  const check = () => {
    setObj2(persons.filter((n) => n.custumername = obj.firstname))

    const numsTimes2 = persons.map((pur) => {
      return pur.custumername = obj.firstname
    });
  console.log(numsTimes2);
  console.log(obj2);
  };



//


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the payload for both updates
    const payload = {
      customerId: sessionStorage.id,
      updatedCustomer: obj,
      updatedPurchases: true
    };

    // Dispatch the combined update action
    dispatch({ type: 'UPDATE_CUSTOMER_AND_PURCHASES', payload });

    // Update in Firebase
    try {
      // Update customer document
      await updateDoc(doc(db, 'Customers', sessionStorage.id), obj);

      // Update all related purchases
      const purchasesQuery = query(
        collection(db, 'Purchases'),
        where('customerid', '==', sessionStorage.id)
      );

      const purchasesSnapshot = await getDocs(purchasesQuery);

      // Get all products
      const productsQuery = query(collection(db, 'Products'));
      const productsSnapshot = await getDocs(productsQuery);

      // Create a batch for all updates
      const batch = writeBatch(db);

      // Update purchases
      purchasesSnapshot.forEach((purchaseDoc) => {
        batch.update(doc(db, 'Purchases', purchaseDoc.id), {
          custumername: obj.firstname,
          lastname: obj.lastname,
          city: obj.city
        });
      });

      // Update customer arrays in products
      productsSnapshot.forEach((productDoc) => {
        const productData = productDoc.data();
        if (productData.custumers && Array.isArray(productData.custumers)) {
          const hasCustomer = productData.custumers.some(cust => cust.customerid === sessionStorage.id);

          if (hasCustomer) {
            const updatedCustomers = productData.custumers.map(customer =>
              customer.customerid === sessionStorage.id
                ? {
                    ...customer,
                    name: obj.firstname,
                    lastname: obj.lastname,
                    city: obj.city
                  }
                : customer
            );

            batch.update(doc(db, 'Products', productDoc.id), {
              custumers: updatedCustomers
            });
          }
        }
      });

      // Get current total from Purchases collection
      const allPurchasesQuery = query(collection(db, 'Purchases'));
      const allPurchasesSnapshot = await getDocs(allPurchasesQuery);
      const currentTotal = allPurchasesSnapshot.docs.length;

      // Update total in Firebase
      batch.update(doc(db, 'total', 'ZPc7E3XajxbJh3LH8ptn'), {
        total2: currentTotal
      });

      // Commit all updates
      await batch.commit();

      // Update Redux total
      dispatch({ type: 'UPDATE_TOTAL', payload: currentTotal });

      nav('/customers');
    } catch (error) {
      console.error('Error updating documents:', error);
    }
  };


  const del = async () => {
    try {
      // Create a batch for all delete operations
      const batch = writeBatch(db);

      // Delete customer document
      batch.delete(doc(db, 'Customers', sessionStorage.id));

      // Get and delete all related purchases
      const purchasesQuery = query(
        collection(db, 'Purchases'),
        where('customerid', '==', sessionStorage.id)
      );
      const purchasesSnapshot = await getDocs(purchasesQuery);
      purchasesSnapshot.forEach((purchaseDoc) => {
        batch.delete(doc(db, 'Purchases', purchaseDoc.id));
      });

      // Get all products to update their custumers arrays
      const productsQuery = query(collection(db, 'Products'));
      const productsSnapshot = await getDocs(productsQuery);

      // Remove customer from products' custumers arrays
      productsSnapshot.forEach((productDoc) => {
        const productData = productDoc.data();
        if (productData.custumers && Array.isArray(productData.custumers)) {
          const hasCustomer = productData.custumers.some(cust => cust.customerid === sessionStorage.id);

          if (hasCustomer) {
            const updatedCustomers = productData.custumers.filter(
              customer => customer.customerid !== sessionStorage.id
            );

            batch.update(doc(db, 'Products', productDoc.id), {
              custumers: updatedCustomers
            });
          }
        }
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

      // Update Redux state
      dispatch({ type: 'DELETE_CUSTOMER_AND_PURCHASES', payload: sessionStorage.id });

      // Navigate away
      nav('/customers');
    } catch (error) {
      console.error('Error deleting customer and related data:', error);
    }
  };

  const cancele = () => {


    nav('/customers');


  };



  // sessionStorage.id = custom.id;
  // sessionStorage.firstname = custom.firstname;
  // sessionStorage.lastname = custom.lastname;
  // sessionStorage.city = custom.city;



  return (
    <div className="edit-customer-container">
      <div className="edit-customer-header">
        <h2>Edit Customer: {sessionStorage.firstname}</h2>
        <span className="customer-id">ID: {sessionStorage.id}</span>
      </div>

      <form onSubmit={handleSubmit} className="edit-customer-form">
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            defaultValue={sessionStorage.firstname}
            onChange={(e) => setObj({ ...obj, firstname: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            defaultValue={sessionStorage.lastname}
            onChange={(e) => setObj({ ...obj, lastname: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            defaultValue={sessionStorage.city}
            onChange={(e) => setObj({ ...obj, city: e.target.value })}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="button-primary">Save Changes</button>
          <button type="button" className="button-danger" onClick={del}>Delete Customer</button>
          <button type="button" className="button-secondary" onClick={cancele}>Cancel</button>
        </div>
      </form>

      <div className="purchases-section">
        <h2>Purchases History - {sessionStorage.firstname}</h2>
        <Productforedit name={sessionStorage.firstname} />
      </div>
    </div>
  )
}

export default Editcustumer






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


