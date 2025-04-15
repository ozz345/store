import { useSelector } from 'react-redux';

const Total = () => {
  const total = useSelector((state) => state.total);

  return (
    <div

    >
      <h2> Total Purchased:</h2>
      {total}
    </div>
  );
};

export default Total;