import { Link, useNavigate } from 'react-router-dom';

const Menupage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'red', width: '400px', height: '400px' }}>
      <h1>Main Menu</h1>
      {/* Option 1 */}
      <Link to='/products'>Products Page</Link>
      
      <Link to='/customers'>Customers Page</Link>
     
      <Link to='/purchases'>Prchases Psage</Link>
      <br /> <br />

      {/* Option 2 */}
      {/* <button onClick={() => navigate('/about')}>About Page</button>
      <h3
        style={{ width: 'fit-content' }}
        onMouseOver={() => navigate('/about')}
      >
        About Page
      </h3> */}
    </div>
  );
};

export default Menupage;
