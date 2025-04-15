import { useSelector } from 'react-redux';
import Prodpreviewchild from './Prodpreviewchild';




const Purchasesview = () => {
  const Purchases = useSelector((state) => state.Purchases);

  const check = () => {

console.log(Purchases);
    

  };


  return (
    <div
      style={{
                
        position: 'absolute',
        top: '200%',
        left: '100%',
        width: '100%',
        textAlign: 'center',
        fontSize: '18px',
        
      }}
    >
            <ul>
        {Purchases.map((color, index) => {
          return <li key={index}>{color.customerid}</li>;
        })}
      </ul>

<button onClick={check}>check</button>
    </div>
  );
};

export default Purchasesview;