import { useSelector } from 'react-redux';
import Prodpreviewforhomechild from './Prodpreviewforhomechild';
import { Link } from 'react-router-dom';

const Prodpreviewforhome = () => {
  const products = useSelector((state) => state.Products);
  const productsslice = products.slice(0, 2)

  return (
    <>

      {productsslice.map((prod, index) => (
        <Prodpreviewforhomechild key={index} product={prod} />
      ))}
    </>
  );
};

export default Prodpreviewforhome;