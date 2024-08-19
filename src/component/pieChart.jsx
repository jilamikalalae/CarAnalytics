import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const PieChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("acquisitions");
    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: data,
      //   type: "bar",
      //   data: {
      //     labels: data.map((row) => row.year),
      //     datasets: [
      //       {
      //         label: "Acquisitions by year",
      //         data: data.map((row) => row.count),
      //       },
      //     ],
      //   },
    });
  });
  return (
    <>
      <div style={{ width: "500px" }}>
        <canvas id="acquisitions"></canvas>
      </div>
      {/* <BarChart></BarChart> */}
    </>
  );
};

export default PieChart;
