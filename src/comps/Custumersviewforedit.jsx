import { useSelector } from 'react-redux';
import Custumersviewforeditchild from './Custumersviewforeditchild';

const Custumersviewforedit = (prop) => {

  const customers = useSelector((state) => state.Customers);


  const purchases = useSelector((state) => state.Purchases);

  const result = [
    ...purchases
        .reduce((r, e) => {
            let k = `${e.custumername}|${e.productname}`
            if (!r.has(k)) r.set(k, { ...e, count: 1 })
            else r.get(k).count++
            return r
        }, new Map())
        .values(),
  ]
  const newArr2 = result.filter((n) => n.productname === prop.name);
  console.log(newArr2);


  return (
    <   >



      <table
            >
        <thead>
          <tr>
          <th>Custumer Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
        {newArr2.map((name, index) => {
        return <Custumersviewforeditchild key={index} name={name} />;
      })}
        </tbody>
      </table>


    </>
  );
};

export default Custumersviewforedit;