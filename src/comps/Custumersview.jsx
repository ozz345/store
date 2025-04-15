import { useSelector } from 'react-redux';
import Custumersviewchild from './Custumersviewchild';

const Custumersview = () => {

  const customers = useSelector((state) => state.Customers);




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

      {customers.map((cust, index) => {
        return <Custumersviewchild key={index} custom={cust} />;
      })}

    </div>
  );
};

export default Custumersview;