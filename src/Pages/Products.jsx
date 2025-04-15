import React from 'react'
import Total from '../comps/Total'
import Prodpreview from '../comps/Prodpreview'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Prodpreviewgrandchild from '../comps/Prodpreviewgrandchild';
import Breadcrumbs from '../comps/Breadcrumbs';

const Products = () => {
  const products = useSelector((state) => state.Products);
  const purchases = useSelector((state) => state.Purchases);

  const productsnamearr = []
  const obj = [];

  for (let i = 0; i < products.length; i++) {
    productsnamearr.push(products[i].name)
  }

  for (let i = 0; i < productsnamearr.length; i++) {
    obj.push(purchases.filter((n) => n.productname === productsnamearr[i]))
  }

  return (
    <div className="products-container">
      <Breadcrumbs />
      <div className="products-header">
        <h1>Products</h1>
        <Link to="/add-product" className="add-button">
          Add New Product
        </Link>
      </div>

      <div className="products-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Purchases</h3>
          <p>{purchases.length}</p>
        </div>
        <div className="stat-card">
          <h3>Unique Dates</h3>
          <p>{new Set(purchases.map(p => p.date)).size}</p>
        </div>
      </div>

      <div className="products-grid">
        <Prodpreview />
      </div>
    </div>
  );
};

export default Products;

