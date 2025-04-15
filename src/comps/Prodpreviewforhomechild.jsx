import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Prodpreviewgrandchild from './Prodpreviewgrandchild';

const Prodpreviewforhomechild = ({ product }) => {

  const [isExist, setIsExist] =useState(false)
  const navigate = useNavigate();

  const next = () => {
    sessionStorage.id = product.id;
    sessionStorage.name = product.name;
    sessionStorage.price = product.price;
    sessionStorage.quantity = product.quantity;
    navigate('/editproduct');
  };

  return (
    <div className="product-card">
      <div className="product-card-header">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">${product.price}

        </div>
      </div>

      <div className="product-details">
        <div className="product-quantity">
          <span>Quantity in Stock:</span>
          <strong>{product.quantity}</strong>
        </div>




      </div>
    </div>
  );
};

export default Prodpreviewforhomechild;


// for (let i = 0; i < products.length; i++) {
//   productsnamearr.push(products[i].name)

// }

//   for (let i = 0; i < productsnamearr.length; i++) {
//     obj.push (purchases.filter((n) => n.productname === productsnamearr[i]))

//   }

//     const result = [
//       ...obj
//           .reduce((r, e) => {
//               let k = `${e.custumername}|${e.productname}`
//               if (!r.has(k)) r.set(k, { ...e, count: 1 })
//               else r.get(k).count++
//               return r
//           }, new Map())
//           .values(),
//   ]
