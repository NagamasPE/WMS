import React from "react";
import { Line } from "react-chartjs-2";
import classes from "./css/Chart.module.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

function LineChart(props) {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: [10000, 75000, 50000, 45000, 28000],
        backgroundColor: "#transparent",
        borderColor: "#f26c6d",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
    ],
  };

  const option = {
    maintainAspectRatio: true,
    layout: {
      padding: 0,
    },
    plugins: {
      customCanvasBackgroundColor: {
        color: "lightGreen",
      },
      legend: {
        display: true,
        position: "bottom",
        align: "center",
      },
      filler: {
        propagate: false,
      },
      "samples-filler-analyser": {
        target: "chart-analyser",
      },
    },
    responsive: true,
    animations: {
      tension: {
        duration: 2500,
        easing: "easeOutBounce",
        from: 0,
        to: 0.5,
        loop: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        min: 0,
        max: 100000,
        ticks: {
          stepSize: 20000,
          callback: (value) => value / 1000 + "K",
        },
        title: {
          display: true,
          text: "Gain",
        },
      },
    },
  };

  return (
    <div className={classes.containerLine}>
      {/* <h2>{props.title}</h2> */}
      <Line data={props.chartData} options={option} />
    </div>
  );
}

export default LineChart;
