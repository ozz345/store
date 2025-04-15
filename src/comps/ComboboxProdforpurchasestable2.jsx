import { useNavigate } from 'react-router-dom';


const ComboboxProdforpurchasestable2 = ({custom}) => {

  return (
    <>



      <tr >

      <td>{custom.productid}</td>
      <td>{custom.productname}</td>
      <td>{custom.count}</td>
      <td>{custom.customerid}</td>
      <td>{custom.custumername}</td>
      <td>{custom.date}</td>

    </tr>

    </>
  );
};

export default ComboboxProdforpurchasestable2;





