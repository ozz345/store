import { useSelector } from 'react-redux';
import Custumersviewchild from './Custumersviewchild';
import { useNavigate } from 'react-router-dom';


const Custumersviewforeditchild = ({name}) => {


  const navigate = useNavigate();
  const next = () => {

    sessionStorage.city = name.city
    sessionStorage.lastname = name.lastname
    sessionStorage.firstname = name.custumername;
    sessionStorage.id = name.customerid
    navigate('/editcustumer');
  };




  return (
    < >
   <tr >

     <td><button onClick={next}>{name.custumername}</button></td>
     <td>{name.count}</td>
     {/* <td><button onClick={next}>{custom.productname}</button></td> */}

     {/* <button onClick={(next)=>}>{name.custumername}</button> */}
   </tr>
    </>
  );
};

export default Custumersviewforeditchild;