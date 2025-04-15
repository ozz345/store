import { v4 as uuidv4 } from 'uuid';
// { id: uuidv4(), ...action.payload }

const initialState = {

  Products: [ ],
  Customers: [],
  Purchases: [],
  Users: [],

  total: 0


};

// state - current state
// action - { type: 'WHAT_TO_DO', [payload: value] }
const counterReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOAD': {
      return { ...state, Products: action.payload };
    }

    case 'LOADCUST': {
      return { ...state, Customers: action.payload };
    }
    case 'LOADTOTAL': {
      return { ...state, total: action.payload };
    }


    case 'LOADPURECHASES': {
      return { ...state, Purchases: action.payload };
    }




    case 'ADDPURCHASES':
      return {
        ...state,
        Purchases: [...state.Purchases, action.payload],
        total: state.total+1

      }
      case 'ADDPURCHASESTOPRODUCT':
        return {
          ...state,
          Products: state.Products.map((object) =>
            object.id == action.payload.customerid
              ? {
                  ...object,
                  custumers: [...object.custumers, {name: action.payload.custumername, lastname:action.payload.lastname, city:action.payload.city, date:action.payload.date, customerid:action.payload.customerid, productname:action.payload.productname}], // Add the new item to the array

                }
              : object
          ),
        };






    case 'EDIT': {
      const products = [...state.Products];
      const index = products.findIndex((prod) => prod.id == action.payload.id);

      if (index !== -1) {
        products[index] = action.payload;
      }

      return { ...state, Products: products };
    }






    case 'DELETE': {
      const prods = state.Products.filter((prod) => prod.id !== action.payload);

      return { ...state, Products: prods };
    }


    case 'DELETECUSTUM': {
      const custumers = state.Customers.filter((cust) => cust.id !== action.payload);

      return { ...state, Customers: custumers };
    }



    case 'UPDATE_CUSTOMER_AND_PURCHASES': {
      const { customerId, updatedCustomer, updatedPurchases } = action.payload;

      // Update Customers
      const updatedCustomers = state.Customers.map(customer =>
        customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
      );

      // Update all related purchases
      const updatedPurchasesList = state.Purchases.map(purchase =>
        purchase.customerid === customerId
          ? {
              ...purchase,
              custumername: updatedCustomer.firstname || purchase.custumername,
              lastname: updatedCustomer.lastname || purchase.lastname,
              city: updatedCustomer.city || purchase.city
            }
          : purchase
      );

      // Update customers arrays in Products
      const updatedProducts = state.Products.map(product => {
        const updatedCustomers = product.custumers?.map(customer =>
          customer.customerid === customerId
            ? {
                ...customer,
                name: updatedCustomer.firstname,
                lastname: updatedCustomer.lastname,
                city: updatedCustomer.city
              }
            : customer
        ) || [];

        return {
          ...product,
          custumers: updatedCustomers
        };
      });

      return {
        ...state,
        Customers: updatedCustomers,
        Purchases: updatedPurchasesList,
        Products: updatedProducts
      };
    }

    case 'DELETE_CUSTOMER_AND_PURCHASES': {
      const customerId = action.payload;

      // Remove customer from Customers list
      const updatedCustomers = state.Customers.filter(
        customer => customer.id !== customerId
      );

      // Remove all purchases related to the customer
      const updatedPurchases = state.Purchases.filter(
        purchase => purchase.customerid !== customerId
      );

      // Calculate new total
      const newTotal = updatedPurchases.length;

      // Remove customer from all Products' custumers arrays
      const updatedProducts = state.Products.map(product => {
        if (product.custumers && Array.isArray(product.custumers)) {
          return {
            ...product,
            custumers: product.custumers.filter(
              customer => customer.customerid !== customerId
            )
          };
        }
        return product;
      });

      return {
        ...state,
        Customers: updatedCustomers,
        Purchases: updatedPurchases,
        Products: updatedProducts,
        total: newTotal
      };
    }

    case 'UPDATE_PRODUCT_AND_PURCHASES': {
      const { productId, updatedProduct, updatedPurchases } = action.payload;

      // Update product in Products list
      const updatedProducts = state.Products.map(product =>
        product.id === productId ? updatedProduct : product
      );

      // Update all related purchases
      const updatedPurchasesList = state.Purchases.map(purchase => {
        const matchingUpdatedPurchase = updatedPurchases.find(up => up.id === purchase.id);
        return matchingUpdatedPurchase || purchase;
      });

      return {
        ...state,
        Products: updatedProducts,
        Purchases: updatedPurchasesList
      };
    }

    case 'DELETE_PRODUCT_AND_PURCHASES': {
      const { productId, purchaseIds } = action.payload;

      // Remove product from Products list
      const updatedProducts = state.Products.filter(
        product => product.id !== productId
      );

      // Remove all purchases related to the product
      const updatedPurchases = state.Purchases.filter(
        purchase => !purchaseIds.includes(purchase.id)
      );

      // Calculate new total
      const newTotal = updatedPurchases.length;

      return {
        ...state,
        Products: updatedProducts,
        Purchases: updatedPurchases,
        total: newTotal
      };
    }

    case 'UPDATE_TOTAL': {
      return {
        ...state,
        total: action.payload
      };
    }

    case 'UPDATE_PRODUCT_QUANTITY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        Products: state.Products.map(product =>
          product.id === id
            ? { ...product, quantity }
            : product
        )
      };
    }

    default:
      return state;
  }
};

export default counterReducer;



// id: 0,
// firstname:'',
// lastname:'',
// age:0