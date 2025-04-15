import { useNavigate } from 'react-router-dom';


const ComboboxProdforpurchasestable = ({custom}) => {

  return (
    <>



<tr >

     <td>{custom.customerid}</td>
     <td>{custom.custumername}</td>
     <td>{custom.date}</td>
     <td>{custom.productname}</td>
     <td>{custom.productid}</td>
     <td>{custom.count}</td>

   </tr>

    </>
  );
};

export default ComboboxProdforpurchasestable;


















