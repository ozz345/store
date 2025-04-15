import React from 'react'
import { useSelector } from 'react-redux';
import ComboboxProdforpurchasestable from './ComboboxProdforpurchasestable2';
import { Link } from 'react-router-dom';

const Homepageforpurchases = () => {
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

  const slicedItems = result.slice(0, 3)
  return (

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
              {slicedItems.length > 0 ? (
                slicedItems.map((pur, index) => (
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



  )
}

export default Homepageforpurchases