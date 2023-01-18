import GaugeChart from "react-gauge-chart";
import classes from "./css/MainGauge.module.css";
function MainGauge(props) {
  const chartStyle = {
    width: "90%",
  };
  const percent= props.currentVal/props.maxVal;
  const outpercent=Math.round(percent*100);
  return (
    <div className={classes.allarea}>
      <div className={classes.title}>{props.title}</div>      
    
      <GaugeChart
            className={classes.gauge}
            id={props.id}
            animate={false}
            /*nrOfLevels={10}*/ /*default area gauge sama rata*/
            percent={percent}
            colors={["#ff0000", "#ffdd00", "#008000"]}
            hideText={true}
            arcWidth={0.3}
            cornerRadius={4}
            arcsLength={[0.5, 0.3, 0.2]} /*custome asymetris area gauge*/
            arcPadding={0.02}
            needleBaseColor={"#2b2d42"}
            needleColor={"#edf6f9"}
            style={chartStyle} 
          />
         
      
      <div className={classes.percent}>{outpercent}%</div>
    </div>
  );
}
export default MainGauge;
