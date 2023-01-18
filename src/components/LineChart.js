import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

function LineChart(props) {
  return (
    <div className="chart">
      <h2>{props.title}</h2>
      <Line data={props.chartData} options={props.options} height={props.height} />;
    </div>
  );
}

export default LineChart;
