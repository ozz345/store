import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Custumersviewchild = ({custom}) => {
  const navigate = useNavigate();

  const next = () => {
    sessionStorage.id = custom.id;
    sessionStorage.firstname = custom.firstname;
    sessionStorage.lastname = custom.lastname;
    sessionStorage.city = custom.city;
    navigate('/editcustumer');
  };

  return (
    <div className="customer-item">
   {custom.id}
      <div className="customer-details">
        <span>{`Full Name: ${custom.firstname} ${custom.lastname}`}</span>
        <span>City: {custom.city}</span>
        <button onClick={next} className="customer-name-button">
Edit custumer
      </button>
      </div>
    </div>
  );
};

export default Custumersviewchild;