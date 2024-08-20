import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const formatPrice = (priceString) => {
  return parseFloat(priceString.replace(/,/g, ""));
};

const StackbarChart = ({ carData }) => {
  const brands = carData.MMList;
  const cars = carData.Cars;

  const brandModels = {};

  cars.forEach((car) => {
    const brandName =
      brands.find((brand) => brand.mkID === car.MkID)?.Name || "Unknown";
    if (!brandModels[brandName]) {
      brandModels[brandName] = { totalValue: 0, models: [] };
    }
    const modelName = car.Model;
    const modelValue = formatPrice(car.Prc);

    brandModels[brandName].models.push({
      name: modelName,
      value: modelValue,
    });
  });

  const sortedBrands = Object.keys(brandModels)
    .sort()
    .map((brand) => ({
      brand,
      ...brandModels[brand],
    }));

  const labels = sortedBrands.map((brand) => brand.brand);

  const datasets = [];
  sortedBrands.forEach((brandData) => {
    brandData.models.forEach((model, index) => {
      if (!datasets[index]) {
        datasets[index] = {
          label: model.name,
          data: Array(sortedBrands.length).fill(0),
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 0.6)`,
        };
      }
      datasets[index].data[sortedBrands.indexOf(brandData)] = model.value;
    });
  });

  const data = {
    labels,
    datasets,
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Car Value by Brand and Model (Stacked)",
      },
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `Value: ${tooltipItem.raw.toLocaleString()} Baht`,
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackbarChart;
