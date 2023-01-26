import React, { Component } from "react";
import { Chart } from "chart.js";

class AreaChart extends Component {
  componentDidMount() {
    const ctx = document.getElementById("myChart").getContext("2d");

    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales",
          data: [35, 45, 55, 65, 75, 85],
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          borderColor: "rgba(0, 0, 255, 1)",
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Sales by Month",
      },
    };

    new Chart(ctx, {
      type: "area",
      data: data,
      options: options,
    });
  }

  render() {
    return (
      <div>
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

export default AreaChart;
