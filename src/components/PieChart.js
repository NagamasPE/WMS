import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

function PieChart(props) {
  return (
    <div className="chart">
      <h2>{props.title}</h2>
      <Doughnut data={props.chartData} options={props.options} />;
    </div>
  );
}

export default PieChart;
