import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const colorPalette = [
  '#D1E9F6', '#F6EACB', '#F1D3CE', '#EECAD5', '#CCD5AE', 
  '#E0E5B6', '#FAEDCE', '#FEFAE0', '#91DDCF', '#F7F9F2',
  '#E8C5E5', '#F19ED2', '#B1AFFF', '#BBE9FF', '#FFFED3',
  '#FF9EAA', '#FFD0D0', '#FFE4CF', '#FF5BAE', '#E72929',
  '#F6D6D6'
];

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.brand),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: colorPalette,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.raw.toLocaleString()} Baht`
        }
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;