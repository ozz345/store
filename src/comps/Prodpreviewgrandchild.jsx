import { useNavigate } from 'react-router-dom';
import ComboboxProdchild from './ComboboxProdchild';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from "uuid"
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
  arrayRemove,
  getDoc
} from 'firebase/firestore';

const Prodpreviewgrandchild = ({custom}) => {
  const products = useSelector((state) => state.Products);
  const custumers = useSelector((state) => state.Customers);
  const [prodname, setProdname] = useState();
  const [custname, setCustname] = useState();
  const [date, setDate] = useState();
  const [custid, setCustid] = useState();
  const [isExist, setIsExist] = useState(false);
  const unique_id = uuid();
  const total = useSelector((state) => state.total);
  const total2 = total+1;
  const dispatch = useDispatch();

  const name = (e) => {
    setProdname(e.target.value)
    setCustname(custom.name)
    setDate(custom.date)
    setCustid(custom.customerid)

    const product = products.filter((n) => n.name === e.target.value);
    const custumer = custumers.filter((n) => n.name=== custom.name);

    sessionStorage.idd = product[0].id;
  };

  const save = async () => {
    try {
      // Get the current product
      const product = products.find(p => p.name === prodname);

      if (!product) {
        alert('Please select a product first');
        return;
      }

      if (product.quantity <= 0) {
        alert('This product is out of stock');
        return;
      }

      // Create the purchase object
      const purchaseObj = {
        id: unique_id,
        productid: sessionStorage.idd,
        customerid: custid,
        date: date,
        custumername: custname,
        productname: prodname
      };

      // Create customer purchase record for the product
      const customerPurchase = {
        name: custname,
        date: date,
        customeridprod: unique_id,
        customerid: custid
      };

      // Update product quantity in Firestore
      const productRef = doc(db, "Products", sessionStorage.idd);
      const productDoc = await getDoc(productRef);
      const currentQuantity = productDoc.data().quantity;

      await updateDoc(productRef, {
        quantity: currentQuantity - 1,
        custumers: arrayUnion(customerPurchase)
      });

      // Add purchase to Purchases collection
      await addDoc(collection(db, 'Purchases'), purchaseObj);

      // Update total
      await updateDoc(doc(db, 'total', 'ZPc7E3XajxbJh3LH8ptn'), { total2 });

      // Update Redux state
      dispatch({ type: 'ADDPURCHASES', payload: purchaseObj });
      dispatch({
        type: 'UPDATE_PRODUCT_QUANTITY',
        payload: {
          id: sessionStorage.idd,
          quantity: currentQuantity - 1
        }
      });
      dispatch({ type: 'ADDPURCHASESTOPRODUCT', payload: purchaseObj });

      // Reset form
      setIsExist(false);
      setProdname('');

      // Show success message
      alert('Purchase completed successfully');

    } catch (error) {
      console.error('Error saving purchase:', error);
      alert('Error saving purchase. Please try again.');
    }
  };

  const navigate = useNavigate();
  const next = () => {
    sessionStorage.city = custom.city;
    sessionStorage.firstname = custom.name;
    sessionStorage.lastname = custom.lastname;
    sessionStorage.id = custom.customerid;
    navigate('/editcustumer');
  };

  return (
    <>
      <tr>
        <td>
          <button onClick={next} className="link-button">
            {custom.name}
          </button>
        </td>
        <td>{custom.date}</td>
        <td>
          <button onClick={() => setIsExist(!isExist)} className="action-button">
            {isExist ? 'Cancel' : 'Add'}
          </button>
        </td>
      </tr>
      {isExist && (
        <tr>
          <td colSpan="3">
            <div className="add-product-form">
              <h3>Choose a Product:</h3>
              <div className="select-group">
                <select onChange={name} defaultValue='' className="product-select">
                  <option value={''}>Select a product</option>
                  {products.map((prod, index) => (
                    <ComboboxProdchild key={index} prod={prod} />
                  ))}
                </select>
                <button onClick={save} className="save-button">
                  Save
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default Prodpreviewgrandchild;







// {customers.map((cust, index) => {
//   return (

//   );
// })}