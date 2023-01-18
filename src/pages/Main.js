import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import Table from "../components/Table";
import { useState } from "react";
import { UserData } from "../Data";
import Gauge from "../components/Gauge";

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
    <div className="objs">
      <div className="obj">
        <Table title="Output Per Orang" />
      </div>
      <div className="obj">
        <LineChart title="Value" chartData={userData} height={90} />
      </div>
      <div className="obj">
        <Table title="Output Per Group" />
      </div>
      <div className="obj">
        <PieChart
          title="Group"
          chartData={userData}
          options={{ radius: "50%", cutout: "40%" }}
        />
      </div>
      <div className="obj">
        <Gauge title="Main Gauge 2" percent= {0.68}/>
      </div>
    </div>
  );
}

export default Main;
