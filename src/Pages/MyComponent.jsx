import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


function DuplicateCounter({ matrix }) {
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [duplicateValues, setDuplicateValues] = useState([]);
  

  useEffect(() => {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
      setDuplicateCount(0);
      setDuplicateValues([]);
      return; // Important: Exit early if the matrix is invalid
    }

    const counts = {};
    let count = 0;
    const values = [];

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const value = matrix[i][j].productname;

        counts[value] = (counts[value] || 0) + 1; // Increment count or initialize to 1

        if (counts[value] === 2) { // Found the *second* occurrence, so it's a duplicate
          count++;
          values.push(value); // Store the duplicate value
        }
      }
    }

    setDuplicateCount(count);
    setDuplicateValues(values);
  }, [matrix]);

  return (
    <div>
      <p>Total Duplicates: {duplicateCount}</p>
      {duplicateValues.length > 0 && (
        <p>Duplicate Values: {duplicateValues.join(', ')}</p>
      )}
    </div>
  );
}

// Example usage:
function MyComponent() {

  const products = useSelector((state) => state.Products);
  const purchases = useSelector((state) => state.Purchases);

  const productsnamearr = []
const obj = [];


for (let i = 0; i < products.length; i++) {
productsnamearr.push(products[i].name)

}

for (let i = 0; i < productsnamearr.length; i++) {
obj.push (purchases.filter((n) => n.productname === productsnamearr[i]))

}  

  const matrix1 = [
    [1, 2, 3],
    [4, 2, 6],
    [1, 7, 8],
  ];

  const matrix2 = [
    [1, 2, 3, 1],
    [4, 2, 6, 2],
    [1, 7, 8, 8],
  ];

  const matrix5 = [
    [1, 2, 3, 1],
    [4, 2, 6, 2],
    [1, 7, 8, 8],
  ];

  const matrix3 = []; // Empty matrix
  const matrix4 = [[], [], []]; // Matrix with empty rows
  console.log(obj);
  

  return (
    <div>
      {/* <DuplicateCounter matrix={matrix1} /> */}
      <DuplicateCounter matrix={obj} />
      {/* <DuplicateCounter matrix={matrix3} />
      <DuplicateCounter matrix={matrix4} /> */}
    </div>
  );
}

export default MyComponent;