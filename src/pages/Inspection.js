import master from "../components/css/Master.module.css";
import inspect from "./Inspection.module.css";
import popup from "../components/css/Popup.module.css";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import BufferToImg from "../components/BufferToImg";
import Backdrop from "../components/Backdrop";
import { Alarm } from "@material-ui/icons";
import Mark from "../components/Mark";

function Inspection() {
  const [imageSrc, setImageSrc] = useState(null);
  const [xCoor, setXCoor] = useState(0);
  const [yCoor, setYCoor] = useState(0);
  // const mapRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(0.0);
  const [mapHeight, setMapHeight] = useState(0.0);

  const handleChangeX = (e) => {
    setXCoor(e.target.value);
  };

  const handleChangeY = (e) => {
    setYCoor(e.target.value);
  };

  const serverAddr = "http://localhost:3001";
  const defTable = { col: [{ name: "empty" }], val: [{ empty: "" }] };
  const [Table_data, setTable_Data] = useState(defTable);

  let selectQuery = "select * from ti_gambar_safety";
  const generateData = async () => {
    try {
      const response = await fetch(serverAddr + "/exec/" + selectQuery);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data) {
        if ("err" in data) {
          Alarm(data.err);
        } else {
          setTable_Data(data);
          // console.log(`Table: ${Table_data.val[0]}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateData();
  }, []);

  const [showDetail, setShowDetail] = useState(false);

  const handleDetail = () => {
    setShowDetail(!showDetail);
  };

  const producList = [
    { product: "Product A" },
    { product: "Product B" },
    { product: "Product C" },
    { product: "Product D" },
    { product: "Product E" },
    { product: "Product F" },
    { product: "Product G" },
    { product: "Product H" },
  ];

  const dataProduct = [
    {
      step: 1,
      coorX: 75,
      coorY: 25,
      desc: "home",
      status: 3,
    },
    {
      step: 2,
      coorX: 25,
      coorY: 75,
      desc: "approch",
      status: 2,
    },
    {
      step: 3,
      coorX: 25,
      coorY: 25,
      desc: "tighten",
      status: 1,
    },
    {
      step: 4,
      coorX: 75,
      coorY: 75,
      desc: "home",
      status: 0,
    },
  ];

  return (
    <>
      <div className={master.main}>
        <div className={master.container}>
          <div className={inspect.mainTab}>
            <div className={inspect.titleBar}>PAGE TITLE</div>
            <div style={{ overflow: "scroll" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>No</th>
                    <th> Product</th>
                  </tr>
                </thead>

                <tbody>
                  {producList.map((list, index) => {
                    return (
                      <tr key={`Main Table ${index}`} onClick={handleDetail}>
                        <td>{`${index + 1}`}</td>
                        <td>{list.product}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className={inspect.details}>
            <div
              className={inspect.mapLayout}
              style={{
                flex: "1",
                "--mapLayout-top": `${(xCoor / 100) * mapHeight + 15}px`,
                "--mapLayout-left": `${
                  (yCoor / 100) * mapWidth - mapWidth / 2
                }px`,
              }}
            >
              <div>
                <BufferToImg
                  buffer={
                    Table_data.val !== null ? Table_data.val[0].gambar : null
                  }
                  setMapHeight={setMapHeight}
                  setMapWidth={setMapWidth}
                  setImageSrc={setImageSrc}
                  mapHeight={mapHeight}
                  mapWidth={mapWidth}
                  imageSrc={imageSrc}
                />
                {imageSrc ? (
                  <Mark
                    height={mapHeight}
                    width={mapWidth}
                    data={dataProduct}
                  />
                ) : null}
              </div>
            </div>

            <div className={inspect.status}>
              <label>Step:</label>
              <div className={inspect.params}>1</div>
              <label>Coor X:</label>
              <div className={inspect.params}>20</div>
              {/* <input
                id="CoorX"
                type={"number"}
                name="xCoor"
                min={0}
                step={0.2}
                max={100}
                onChange={handleChangeX}
                style={{
                  margin: "0.5vw",
                  border: "none",
                  borderRadius: "0.5vw",
                  textAlign: "center",
                  fontSize: "1vw",
                  height: "1.5vw",
                }}
              /> */}
              <label>Coor Y:</label>
              <div className={inspect.params}>34</div>
              {/* <input
                id="CoorY"
                type={"number"}
                name="yCoor"
                min={0}
                step={0.2}
                max={100}
                onChange={handleChangeY}
                style={{
                  margin: "0.5vw",
                  border: "none",
                  borderRadius: "0.5vw",
                  textAlign: "center",
                  fontSize: "1vw",
                  height: "1.5vw",
                }}
              /> */}
              <label>Product No:</label>
              <div className={inspect.params}>18</div>
              <label>Batch:</label>
              <div className={inspect.params}>Honda-HRV</div>
            </div>
          </div>
        </div>
      </div>
      {showDetail && <Backdrop close={handleDetail} />}
      {showDetail && (
        <div className={popup.modal}>
          <div
            style={{
              textTransform: "Capitalize",
              fontWeight: "bold",
              fontSize: "1.25vw",
              textAlign: "center",
              margin: "0 0 0.5vw 0",
            }}
          >
            setting coordinate
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Coor X</th>
                <th>Coor Y</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {dataProduct.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.step}</td>
                    <td>{data.coorX}</td>
                    <td>{data.coorY}</td>
                    <td>{data.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Inspection;
