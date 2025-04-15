import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import Custumersview from '../comps/CustumersView';
import Custumersviewforhomepage from '../comps/Custumersviewforhomepage';
import Prodpreviewforhome from '../comps/Prodpreviewforhome';
import { useNavigate } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomePage = () => {
  const navigate = useNavigate();

  const purchases = useSelector((state) => state.Purchases);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    // Process purchases data for the chart
    const purchasesByDate = purchases.reduce((acc, purchase) => {
      const date = purchase.date;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Sort dates
    const sortedDates = Object.keys(purchasesByDate).sort();

    // Prepare data for chart
    const data = {
      labels: sortedDates,
      datasets: [
        {
          label: 'Number of Purchases',
          data: sortedDates.map(date => purchasesByDate[date]),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.3
        }
      ]
    };

    setChartData(data);
  }, [purchases]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Purchases Over Time',
        font: {
          size: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <>
      <div className="stats-header">
        <h2>Purchases</h2>
      </div>
      <button onClick={()=>navigate('/purchases')}>Show More </button> <br></br><br></br>
      <div className="chart-container">
        <Line options={options} data={chartData} height={300} />
      </div>
      <div className="chart-container">
        <Bar
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                ...options.plugins.title,
                text: 'Daily Purchase Distribution'
              }
            }
          }}
          data={chartData}
          height={300}
        />
      </div>

      <div className='customers-view-wrapper-home'>
        <h2>Custumers</h2>
        <button onClick={()=>navigate('/customers')}>Show More </button> <br></br><br></br>
        <Custumersviewforhomepage/>
      </div>

      <div className='products-view-wrapper-home'>
        <h2>Products</h2>
        <button onClick={()=>navigate('/products')}>Show More </button> <br></br><br></br>
        <Prodpreviewforhome/>
      </div>
    </>
  );
};

export default HomePage;


// {isExist && (



// )}

