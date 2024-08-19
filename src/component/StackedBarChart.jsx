import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const formatPrice = (priceString) => {
    // Remove any non-numeric characters (like commas) and convert to number
    return parseFloat(priceString.replace(/,/g, ''));
  };

const colorPalette = [
    '#D1E9F6', '#F6EACB', '#F1D3CE', '#EECAD5', '#CCD5AE', 
    '#E0E5B6', '#FAEDCE', '#FEFAE0', '#91DDCF', '#F7F9F2',
    '#E8C5E5', '#F19ED2', '#B1AFFF', '#BBE9FF', '#FFFED3',
    '#FF9EAA', '#FFD0D0', '#FFE4CF', '#FF5BAE', '#E72929',
    '#F6D6D6'
];

const StackedBarChart = ({ data }) => {
  const brands = data.MMList.map(item => item.Name);
  const models = [...new Set(data.Cars.map(car => car.Model))];

  // Create dataset for each brand
  const datasets = brands.map((brand, index) => {
    const modelData = models.map(model => {
      // Filter cars by brand and get the total value for each model
      const brandID = data.MMList.find(b => b.Name === brand)?.mkID;
      const carsForModel = data.Cars.filter(car => car.MkID === brandID && car.Model === model);
      return carsForModel.reduce((acc, car) => acc + formatPrice(car.Prc), 0);
    });

    return {
      label: brand,
      data: modelData,
      backgroundColor: colorPalette[index % colorPalette.length],
      stack: 'stack'
    };
  });

  const chartData = {
    labels: models,
    datasets: datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw.toLocaleString()} Baht`
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Models'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Total Value (Baht)'
        }
      }
    }
  };

  return <div style={{ height: '500px' }}><Bar data={chartData} options={options} /></div>;
};

export default StackedBarChart;