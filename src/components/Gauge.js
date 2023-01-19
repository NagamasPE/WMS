import GaugeChart from "react-gauge-chart";
import classes from "./css/Gauge.module.css";

function Gauge(props) {
  const percent = props.currentVal / props.maxVal;
  const outpercent = Math.round(percent * 100);
  return (
    <div className={classes.allarea}>
      <div className={classes.title}>
        <div className={classes.dalam}>{props.title}</div>
      </div>
      <div className={classes.gauge}>
        <GaugeChart
          id={props.id}
          animate={false}
          /*nrOfLevels={10}*/ /*default area gauge sama rata*/
          percent={percent}
          colors={[
            "#ff0000",
            "#ff5c00",
            "#ffac00",
            "#ffdd00",
            "#adff2f",
            "#00b000",
            "#008000",
          ]}
          hideText={true}
          arcWidth={0.3}
          cornerRadius={4}
          arcsLength={[
            0.143, 0.143, 0.143, 0.143, 0.143, 0.143, 0.142,
          ]} /*custome asymetris area gauge*/
          arcPadding={0.02}
          needleBaseColor={"#888888"}
          needleColor={"#2b2d42"}
        />
      </div>

      <div className={classes.percent}>
        <div className={classes.dalam}>{outpercent}%</div>
      </div>
      <div className={classes.titlac}>
        <div className={classes.dalamtitle}>Actual:</div>
      </div>
      <div className={classes.titltr}>
        <div className={classes.dalamtitle}>Total:</div>
      </div>
      <div className={classes.actual}>
        <div className={classes.dalam}>{props.currentVal}</div>
      </div>
      <div className={classes.target}>
        <div className={classes.dalam}>{props.maxVal}</div>
      </div>
    </div>
  );
}
export default Gauge;
