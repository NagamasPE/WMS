import inspect from "../pages/Inspection.module.css";
import { useRef } from "react";

function Mark(props) {
  const { data: dots } = props;

  const colorListRef = useRef([]);
  var backgroundColor = 0;
  var colorList = [];

  function myComponent() {
    colorList = colorListRef.current;
    backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;

    const colorObj = {
      backgroundColor: backgroundColor,
    };

    colorList.push(colorObj);
  }

  return (
    <>
      {dots &&
        dots.map((dot, index) => {
          myComponent();

          // console.log(`H: ${props.height} | W: ${props.width}`);
          return (
            <div
              key={index}
              className={inspect.mapMarks}
              style={{
                height: `${props.height}px`,
                width: `${props.width}px`,
                "--mapLayout-top": `${(dot.coorY / 100) * props.height - 29}px`,
                "--mapLayout-left": `${(dot.coorX / 100) * props.width - 20}px`,
                // "--border-mark": `${colorList[index].backgroundColor}`,
                "--border-mark":
                  dot.status === 1
                    ? "greenyellow"
                    : dot.status === 2
                    ? "red"
                    : dot.status === 3
                    ? "gold"
                    : "white",
                "--string":
                  dot.status === 1
                    ? "'OK'"
                    : dot.status === 2
                    ? "'NG'"
                    : dot.status === 3
                    ? "'A'"
                    : "'NA'",
              }}
            />
          );
        })}
    </>
  );
}

export default Mark;
