import React from "react";
import { Line } from "react-chartjs-2";
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

function LineChart(props) {
  return (
    <div className={classes.containerLine}>
      <h2>{props.title}</h2>
      <Line data={props.chartData} options={props.options} />;
    </div>
  );
}

export default LineChart;
