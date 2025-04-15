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
import ComboboxProdforpurchases from '../comps/ComboboxProdforpurchases';
import Breadcrumbs from '../comps/Breadcrumbs';

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

const Purchases = () => {
  const purchases = useSelector((state) => state.Purchases);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (!purchases || purchases.length === 0) return;

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
          size: 16
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
    <div className="purchases-container">
      <Breadcrumbs />
      <div className="purchases-header">
        <h2>Purchase Analytics</h2>
      </div>
      <h3>Purchase Analysis And Statistics </h3>
      {purchases && purchases.length > 0 ? (
        <div className="charts-section">
          <div className="chart-container">
            <Line options={options} data={chartData} />
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
            />
          </div>
        </div>
      ) : (
        <div className="no-data-message">
          No purchase data available
        </div>
      )}
 <h3> Filter Purchases By Custumer/Product </h3>
      <ComboboxProdforpurchases />
    </div>
  );
};

export default Purchases;


