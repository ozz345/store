import React from 'react'
import ComboboxProd from '../comps/ComboboxProd'
import Custumersviewchildfortable from '../comps/Custumersviewchildfortable';
import Custumersviewforedit from '../comps/Custumersviewforedit';
import Custumersview from '../comps/CustumersView';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../comps/Breadcrumbs';

const Customers = () => {
  const purchases = useSelector((state) => state.Purchases);

  const result = [
    ...purchases
      .reduce((r, e) => {
        let k = `${e.custumername}|${e.productname}`
        if (!r.has(k)) r.set(k, { ...e, count: 1 })
        else r.get(k).count++
        return r
      }, new Map())
      .values(),
  ]

  return (
    <div className="page-container">
      <Breadcrumbs />
      <div className="customers-top-section">
        <div className="customers-main-content">
          <div className="page-header">
            <div className="header-content">
              <h2>Custumers</h2>
              <Link to="/addcustumer" className="add-button">
                Add New Customer
              </Link>
            </div>
          </div>

          {/* <div className="filter-section">
            <ComboboxProd />
          </div> */}
          <h3>Make a Purchase By Custumer</h3>
          <ComboboxProd />
          <h3>Purchases By Custumers</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Product</th>
                  <th>Count</th>
                  <th>Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {result.length > 0 ? (
                  result.map((pur, index) => (
                    <Custumersviewchildfortable key={index} custom={pur} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">No customer purchases found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="customers-view-wrapper">
        <h2> Full List</h2>

          <Custumersview />
        </div>


      </div>


    </div>
  );
}

export default Customers;