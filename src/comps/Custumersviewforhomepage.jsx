import { useSelector } from 'react-redux';
import Custumersviewchild from './Custumersviewchild';

const Custumersviewforhomepage = () => {

  const customers = useSelector((state) => state.Customers);
  const customersslice = customers.slice(0, 3)






  return (
    <div
      // style={{

      //   position: 'absolute',
      //   top: '155%',
      //   left: '50%',
      //   width: '100%',
      //   textAlign: 'center',
      //   fontSize: '18px',

      // }}
    >

      {/* <h2>Custumers</h2>
              <button onClick={()=>navigate('/customers')}>See More </button> <br></br><br></br> */}

      {customersslice.map((cust, index) => {
        return <Custumersviewchild key={index} custom={cust} />;
      })}

    </div>
  );
};

export default Custumersviewforhomepage;