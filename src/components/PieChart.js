import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";
import classes from "./css/Chart.module.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

function PieChart(props) {
  const option = {
    plugins: {
      customCanvasBackgroundColor: {
        color: "lightGreen",
      },
      legend: {
        display: true,
        position: "bottom",
        align: "center",
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
    fill: {
      target: "origin",
      above: "rgb(255, 0, 0)", // Area will be red above the origin
      below: "rgb(0, 0, 255)", // And blue below the origin
    },
  };

  return (
    <div className={classes.containerPie}>
      <Doughnut data={props.chartData} options={option} />
    </div>
  );
}

export default PieChart;
