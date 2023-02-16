import master from "../components/css/Master.module.css";
import tabs from "../components/css/Chart.module.css";
import logo from "./image/logo.png";
import { useState } from "react";
import delivery from "./Delivery.module.css";

function Production() {
  const production = [
    { scan: 1, batch: "Batch A1", name: "Product 1", qty: 5 },
    { scan: 2, batch: "Batch A1", name: "Product 2", qty: 10 },
    { scan: 3, batch: "Batch A1", name: "Product 3", qty: 20 },
    { scan: 4, batch: "Batch A1", name: "Product 4", qty: 20 },
    { scan: 5, batch: "Batch A1", name: "Product 5", qty: 20 },
    { scan: 6, batch: "Batch A1", name: "Product 6", qty: 20 },
    { scan: 7, batch: "Batch A1", name: "Product 7", qty: 20 },
    { scan: 8, batch: "Batch A1", name: "Product 8", qty: 20 },
  ];

  const [qtyScan, setQtyScan] = useState(Array(8).fill(false));
  const [liftStat, setLiftStat] = useState(false);

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

  const liftHandle = () => {
    setLiftStat(!liftStat);
  };

  return (
    <>
      <div className={master.main}>
        <div className={master.container}>
          <h2>Production System</h2>
          <div className={delivery.newContainer}>
            <div className={delivery.content}>
              <div className={delivery.hForm}>
                <div className={delivery.full}>
                  <div id={delivery.menu}>
                    <button style={{ backgroundColor: "yellow" }}>
                      CASTING
                    </button>
                    <button style={{ backgroundColor: "lightsalmon" }}>
                      FINISHING/DRILLING/T6
                    </button>
                    <button style={{ backgroundColor: "lightgreen" }}>
                      MACHINING
                    </button>
                  </div>
                </div>
              </div>

              <div className={delivery.hForm}>
                <div className={delivery.full}>
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
                              <th>No Batch Production</th>
                              <th>Material Number</th>
                              <th>Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {production.map((product) => (
                              <tr key={delivery.scan}>
                                <td>{product.scan}</td>
                                <td>{product.batch}</td>
                                <td>{product.name}</td>
                                <td>{product.qty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                  <div className={delivery.sidepane}>
                    <button>INTERLOCK BYPASS</button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Production;
