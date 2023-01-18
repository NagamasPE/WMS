import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import Table from "../components/Table";
import { useState } from "react";
import { UserData } from "../Data";
import MainGauge from "../components/MainGauge";
import Gauge from "../components/Gauge";
import classes from "./Main.module.css";

function Main() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "#023047",
          "#fb8500",
          "#ffb703",
          "#219ebc",
          "#8ecae6",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className={classes.container}>
      <div className={classes.obj}>
        <LineChart title="Value" chartData={userData} />
      </div>
      <div className={classes.obj}>
        <MainGauge title="Main Gauge" currentVal={124} maxVal={584} />
      </div>
      <div className={classes.obj}>
        <PieChart title="Group" chartData={userData} />
      </div>
      <div className={classes.obj}>
        <Gauge title="Gauge 1" currentVal={53} maxVal={584} />
      </div>
      <div className={classes.obj}>
        <Gauge title="Gauge 2" currentVal={334} maxVal={584} />
      </div>
      <div className={classes.obj}>
        <Gauge title="Gauge 2" currentVal={185} maxVal={584} />
      </div>
    </div>
  );
}

export default Main;
