import { useSelector } from 'react-redux';
import Custumersviewchild from './Custumersviewchild';

import { useNavigate } from 'react-router-dom';



const Productforeditchild = ({name}) => {


  const navigate = useNavigate();
  const next = () => {


    sessionStorage.id = name.productid;
    sessionStorage.name = name.productname;
    sessionStorage.price = name.price;
    sessionStorage.quantity = name.quantity;

    // sessionStorage.price = name.price;
    // sessionStorage.quantity = product.quantity;








    navigate('/editproduct');
  };




  return (
    < >
   <tr >

     <td><button onClick={next}>{name.productname}</button></td>
     <td>{name.count}</td>
     {/* <td><button onClick={next}>{custom.productname}</button></td> */}



     {/* <button onClick={()=>}></button> */}
   </tr>
    </>
  );
};

export default Productforeditchild;