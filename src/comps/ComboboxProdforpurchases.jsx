import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import ComboboxProdchild from './ComboboxProdchild';
import Custumersviewchildforcustumer from './Custumersviewchildforcustumer';
import ComboboxProdforpurchasestable from './ComboboxProdforpurchasestable';
import ComboboxProdforpurchasestable2 from './ComboboxProdforpurchasestable2';

const ComboboxProdforpurchases = () => {
  const products = useSelector((state) => state.Products);
  const custumers = useSelector((state) => state.Customers);
  const purchases = useSelector((state) => state.Purchases);
  const [custname, setCustname] = useState('');
  const [prodname, setProdname] = useState('');
  const [isExist, setIsExist] = useState(false);
  const [isExist2, setIsExist2] = useState(false);
  const [isExist3, setIsExist3] = useState(true);
  const [isExist4, setIsExist4] = useState(true);

  const result = [
    ...purchases
      .reduce((r, e) => {
        let k = `${e.custumername}|${e.productname}`;
        if (!r.has(k)) r.set(k, { ...e, count: 1 });
        else r.get(k).count++;
        return r;
      }, new Map())
      .values(),
  ];

  const custarray = result.filter((n) => n.custumername === custname);
  const prodarray = result.filter((n) => n.productname === prodname);

  const searchcust = (e) => {
    setCustname(e.target.value);
    setIsExist(true);
    setIsExist3(false);

    if (e.target.value === '') {
      setIsExist(false);
      setIsExist3(true);
    }
  };

  const searchprod = (e) => {
    setProdname(e.target.value);
    setIsExist2(true);
    setIsExist4(false);

    if (e.target.value === '') {
      setIsExist2(false);
      setIsExist4(true);
    }
  };

  return (
    <div className="purchases-content">
      <div className="select-group">
        <div className="select-container">
          <label className="select-label" htmlFor="customer-select">
            Purchases by Customer
          </label>
          <select
            id="customer-select"
            onChange={searchcust}
            value={custname}
            className="custom-select"
          >
            <option value="">Choose a customer...</option>
            {custumers.map((custom, index) => (
              <Custumersviewchildforcustumer key={index} custom={custom} />
            ))}
          </select>
        </div>

        <div className="select-container">
          <label className="select-label" htmlFor="product-select">
            Purchases by Product
          </label>
          <select
            id="product-select"
            onChange={searchprod}
            value={prodname}
            className="custom-select"
          >
            <option value="">Choose a product...</option>
            {products.map((prod, index) => (
              <ComboboxProdchild key={index} prod={prod} />
            ))}
          </select>
        </div>
      </div>

      <div className="tables-scroll-container">
        {isExist3 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Product Name</th>
                  <th>Product ID</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {result.length > 0 ? (
                  result.map((pur, index) => (
                    <ComboboxProdforpurchasestable key={index} custom={pur} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="table-empty">
                      No purchases found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {isExist && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Product Name</th>
                  <th>Product ID</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {custarray.length > 0 ? (
                  custarray.map((pur, index) => (
                    <ComboboxProdforpurchasestable key={index} custom={pur} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="table-empty">
                      No purchases found for this customer
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {isExist4 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Count</th>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {result.length > 0 ? (
                  result.map((pur, index) => (
                    <ComboboxProdforpurchasestable2 key={index} custom={pur} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="table-empty">
                      No purchases found for this product
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {isExist2 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Count</th>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {prodarray.length > 0 ? (
                  prodarray.map((pur, index) => (
                    <ComboboxProdforpurchasestable2 key={index} custom={pur} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="table-empty">
                      No purchases found for this product
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboboxProdforpurchases;






