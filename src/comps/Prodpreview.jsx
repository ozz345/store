import { useSelector } from 'react-redux';
import Prodpreviewchild from './Prodpreviewchild';
import { Link } from 'react-router-dom';

const Prodpreview = () => {
  const products = useSelector((state) => state.Products);

  return (
    <>
      {products.map((prod, index) => (
        <Prodpreviewchild key={index} product={prod} />
      ))}
    </>
  );
};

export default Prodpreview;