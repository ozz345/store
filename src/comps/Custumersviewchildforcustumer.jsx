import { useNavigate } from 'react-router-dom';


const Custumersviewchildforcustumer = ({custom}) => {

  const navigate = useNavigate();

  return (
    <>



<option>
{custom.firstname}


</option>


    </>
  );
};

export default Custumersviewchildforcustumer;





// {customers.map((cust, index) => {
//   return (

//   );
// })}