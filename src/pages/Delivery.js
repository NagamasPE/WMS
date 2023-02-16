import master from "../components/css/Master.module.css";
import delivery from "./Delivery.module.css";
import tabs from "../components/css/Chart.module.css";
import logo from "./image/logo.png";
import { useState } from "react";

function Delivery() {
  const deliveries = [
    { scan: 1, name: "Delivery 1", qty: 5 },
    { scan: 2, name: "Delivery 2", qty: 10 },
    { scan: 3, name: "Delivery 3", qty: 20 },
    { scan: 4, name: "Delivery 4", qty: 20 },
    { scan: 5, name: "Delivery 5", qty: 20 },
    { scan: 6, name: "Delivery 6", qty: 20 },
    { scan: 7, name: "Delivery 7", qty: 20 },
    { scan: 8, name: "Delivery 8", qty: 20 },
  ];

  const summeries = [
    {
      no: 1,
      material: 123,
      desc: "Material 1",
      pack: "A1",
      qty: 1,
      sloc: "asd",
    },
    {
      no: 2,
      material: 123,
      desc: "Material 2",
      pack: "A1",
      qty: 5,
      sloc: "asd",
    },
    {
      no: 3,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 4,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 5,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 6,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 7,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 8,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 9,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 10,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
  ];

  const [qtyScan, setQtyScan] = useState(Array(8).fill(false));
  const [gateStat, setGateStat] = useState(false);
  const [liftStat, setLiftStat] = useState(false);

  const gateHandle = () => {
    setGateStat(!gateStat);
  };

  const liftHandle = () => {
    setLiftStat(!liftStat);
  };

  const handleToggle = (index) => {
    setQtyScan((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = !newValues[index];
      // Set all other values to false if the current value is true
      if (newValues[index]) {
        for (let i = 0; i < newValues.length; i++) {
          if (i !== index) {
            newValues[i] = false;
          }
        }
      }
      return newValues;
    });
  };

  return (
    <>
      <div className={master.main}>
        <div className={master.container}>
          <h2>Delivery System</h2>
          <div className={delivery.newContainer}>
            <div className={delivery.content}>
              <div className={delivery.hForm}>
                <div className={delivery.thirty}>
                  <div id={delivery.title}>
                    <div>DN Number</div>
                    <div>PTV Number</div>
                    <div>Vendor ID</div>
                    <div>Car Number/Driver</div>
                  </div>
                </div>
                <div className={delivery.seventy}>
                  <div id={delivery.input}>
                    <input type={"text"} placeholder={"Enter Text 1"} />
                    <input type={"text"} placeholder={"Enter Text 2"} />
                    <input type={"text"} placeholder={"Enter Text 3"} />
                    <input type={"text"} placeholder={"Enter Text 4"} />
                  </div>
                </div>
              </div>

              <div className={delivery.hForm}>
                <div className={delivery.seventy}>
                  <div id={delivery.range}>
                    <div>QTY:</div>
                    {qtyScan.map((value, index) => (
                      <div
                        className={
                          `${delivery.rowButton} ` +
                          (value ? `${delivery.buttonOn}` : "")
                        }
                      >
                        <button key={index} onClick={() => handleToggle(index)}>
                          {index + 1}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div id={delivery.display}>
                    <div className={tabs.tabsContainer}>
                      <div className={tabs.viewTab}>
                        <table className={tabs.scanTab}>
                          <thead>
                            <tr>
                              <th>Scan</th>
                              <th>Name</th>
                              <th>Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deliveries.map((delivery) => (
                              <tr key={delivery.scan}>
                                <td>{delivery.scan}</td>
                                <td>{delivery.name}</td>
                                <td>{delivery.qty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={delivery.thirty}>
                  <div className={delivery.stat}>
                    <div style={{ fontWeight: "bold" }}>Status Gate</div>
                    <div
                      onClick={() => gateHandle()}
                      className={
                        `${delivery.indicator} ` +
                        (gateStat ? `${delivery.statOn}` : "")
                      }
                    >
                      {gateStat ? "OPEN" : "CLOSE"}
                    </div>
                  </div>
                  <div className={delivery.stat}>
                    <div style={{ fontWeight: "bold" }}>Status Lifter</div>
                    <div
                      onClick={() => liftHandle()}
                      className={
                        `${delivery.indicator} ` +
                        (liftStat ? `${delivery.statOn}` : "")
                      }
                    >
                      {liftStat ? "ON" : "OFF"}
                    </div>
                  </div>
                </div>
              </div>

              <div className={delivery.hForm}>
                <div className={delivery.sum}>
                  <div className={tabs.tabsContainer}>
                    <div className={tabs.viewTab}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Material Number</th>
                            <th>Material Description</th>
                            <th>Package</th>
                            <th>Quantity</th>
                            <th>SLOC</th>
                          </tr>
                        </thead>
                        <tbody>
                          {summeries.map((delivery) => (
                            <tr key={delivery.name}>
                              <td>{delivery.no}</td>
                              <td>{delivery.material}</td>
                              <td>{delivery.desc}</td>
                              <td>{delivery.pack}</td>
                              <td>{delivery.qty}</td>
                              <td>{delivery.sloc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={delivery.side}>
              <div className={delivery.vForm}>
                <div className={delivery.logo}>
                  <img alt="logo astra" src={logo} />
                </div>
                <div className={delivery.buttons}>
                  <div className={delivery.gateControl}>
                    <button>Close Gate</button>
                    <button>Bypass Open Gate</button>
                  </div>
                  <div className={delivery.control}>
                    <button>Finish Loading</button>
                    <button>Create Delivery Note</button>
                    <button>Interlock Bypass</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={delivery.form}>
            <div className={delivery.seventy}>
              <div className={delivery.header}>
                <div id={delivery.title}>
                  <div>DN Number</div>
                  <div>PTV Number</div>
                  <div>Vendor ID</div>
                  <div>Car Number/Driver</div>
                </div>
                <div id={delivery.value}>
                  <input type={"text"} placeholder={"Enter Text 1"} />
                  <input type={"text"} placeholder={"Enter Text 2"} />
                  <input type={"text"} placeholder={"Enter Text 3"} />
                  <input type={"text"} placeholder={"Enter Text 4"} />
                </div>
              </div>
            </div>
            <div className={delivery.thirty}>
              
            </div>
          </div>

          <div className={delivery.form}>
            <div className={delivery.seventy}>
              <div className={delivery.input}>
                <div id={delivery.range}>
                  <button>1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button>5</button>
                  <button>6</button>
                  <button>7</button>
                  <button>8</button>
                </div>
                <div id={delivery.display}>
                  <div className={tabs.tabsContainer}>
                    <div className={tabs.viewTab}>
                      <table className={tabs.scanTab}>
                        <thead>
                          <tr>
                            <th>Scan</th>
                            <th>Name</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deliveries.map((delivery) => (
                            <tr key={delivery.scan}>
                              <td>{delivery.scan}</td>
                              <td>{delivery.name}</td>
                              <td>{delivery.qty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={delivery.thirty}>
              <div id={delivery.gate}>Status Gate</div>
              <div id={delivery.lifter}>Status Lifter</div>
            </div>
          </div>

          <div className={delivery.form}>
            <div className={delivery.sum}>
              <div className={tabs.tabsContainer}>
                <div className={tabs.viewTab}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Material Number</th>
                        <th>Material Description</th>
                        <th>Package</th>
                        <th>Quantity</th>
                        <th>SLOC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summeries.map((delivery) => (
                        <tr key={delivery.name}>
                          <td>{delivery.no}</td>
                          <td>{delivery.material}</td>
                          <td>{delivery.desc}</td>
                          <td>{delivery.pack}</td>
                          <td>{delivery.qty}</td>
                          <td>{delivery.sloc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Delivery;
