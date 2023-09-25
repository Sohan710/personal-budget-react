import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, PieController, Tooltip, Legend } from 'chart.js';
import D3DoughnutChart from './D3DoughnutChart';

Chart.register(ArcElement, PieController, Tooltip, Legend);

function ChartComponent() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ffcd56", "#ff6384", "#36a2eb", "#fd6b19",
          "#283747", "#7D3C98", "#FA0404", "#2ECC71",
        ],
      },
    ],
  });

  useEffect(() => {
    const getBudget = async () => {
      try {
        const res = await axios.get("http://localhost:3000/budget");
        setChartData((prev) => ({
          ...prev,
          labels: res.data.myBudget.map((item) => item.title),
          datasets: [{
            ...prev.datasets[0],
            data: res.data.myBudget.map((item) => item.budget),
          }],
        }));
      } catch (error) {
        console.error("Error getting budget data", error);
      }
    };
    getBudget();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    if (window.myPieChart) window.myPieChart.destroy(); // Destroy existing chart if exists
    window.myPieChart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }, [chartData]);

  return (
    <div>
      <canvas id="myChart"></canvas>
      <figure>
        <br />
        <h1><figcaption>Financial Distribution Doughnut Chart Using D3JS</figcaption></h1>
        <hr/><hr/>
        <D3DoughnutChart data={chartData.labels.map((label, index) => ({ title: label, budget: chartData.datasets[0].data[index] }))} />
      </figure>
    </div>
  );
}

export default ChartComponent;
