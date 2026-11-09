import React, { useEffect, useState } from "react";
import "./Chart.css";

import { fetchDailyData } from "../api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

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

function Chart({ data, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const getDailyData = async () => {
      const data = await fetchDailyData();
      setDailyData(data);
    };

    getDailyData();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            label: "Infected",
            data: dailyData.map(({ confirmed }) => confirmed),
            borderColor: "#1976d2",
            backgroundColor: "rgba(25,118,210,0.2)",
            fill: true,
          },
          {
            label: "Deaths",
            data: dailyData.map(({ deaths }) => deaths),
            borderColor: "#d32f2f",
            backgroundColor: "rgba(211,47,47,0.2)",
            fill: true,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      }}
    />
  ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            data: [
              data.confirmed,
              data.recovered,
              data.deaths,
            ],
            backgroundColor: [
              "#1976d2",
              "#2e7d32",
              "#d32f2f",
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Current COVID-19 Status ${
              country ? `- ${country}` : ""
            }`,
          },
        },
      }}
    />
  ) : null;

  return (
    <div className="chartContainer">
      {country ? barChart : lineChart}
    </div>
  );
}

export default Chart;