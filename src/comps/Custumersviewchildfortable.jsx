import { useNavigate } from 'react-router-dom';

const Custumersviewchildfortable = ({ custom }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    sessionStorage.id = custom.productid;
    sessionStorage.name = custom.productname;
    sessionStorage.price = custom.price;
    sessionStorage.quantity = custom.quantity;
    navigate('/editproduct');
  };

  return (
    <tr className="table-row">
      <td>{custom.customerid}</td>
      <td>{custom.custumername}</td>
      <td>
        <button
          className="link-button"
          onClick={handleProductClick}
        >
          {custom.productname}
        </button>
      </td>
      <td>{custom.count}</td>
      <td>{custom.date}</td>
    </tr>
  );
};

export default Custumersviewchildfortable;





// {customers.map((cust, index) => {
//   return (

//   );
// })}