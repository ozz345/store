import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ComboboxProdchild = ({prod}) => {


  return (
    <>
<option>
{prod.name}


</option>



    </>
  );
};

export default ComboboxProdchild;