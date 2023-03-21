import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { useState } from "react";
import { UserData } from "../Data";
import MainGauge from "../components/MainGauge";
import classes from "./Main.module.css";

function Main() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.id),
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
        borderColor: "#888888",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
    ],
  });

  // let btn = document.querySelector(".delButton");
  // btn.onClick = function () {
  //   btn.classList.toggle("active");
  // };

  return (
    <div className={classes.container}>
      <div id={classes.obj1}>
        <LineChart title="Value" chartData={userData} />
      </div>
      <div id={classes.main}>
        <MainGauge title="Main Gauge" currentVal={124} maxVal={584} />
      </div>
      <div id={classes.obj2}>
        <PieChart title="Group" chartData={userData} />
      </div>
      <div id={classes.obj3}>
        <button className="delButton">
          <span></span>
          <text>Delete</text>
        </button>
        {/* <Gauge title="Gauge 1" currentVal={53} maxVal={584} /> */}
      </div>
      <div id={classes.obj4}>
        sub 2{/* <Gauge title="Gauge 2" currentVal={334} maxVal={584} /> */}
      </div>
      <div id={classes.obj5}>
        sub 3{/* <Gauge title="Gauge 3" currentVal={134} maxVal={584} /> */}
      </div>
      <div id={classes.obj6}>
        sub 4{/* <Gauge title="Gauge 3" currentVal={134} maxVal={584} /> */}
      </div>
    </div>
  );
}

export default Main;
