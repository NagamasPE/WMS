import { blue } from "@material-ui/core/colors";
import master from "../components/css/Master.module.css";
import delivery from "./Delivery.module.css";
import tabs from "../components/css/Chart.module.css";
import logo from "./image/logo.png";

function Delivery() {
  const deliveries = [
    { name: "Delivery 1", qty: 5 },
    { name: "Delivery 2", qty: 10 },
    { name: "Delivery 3", qty: 20 },
    { name: "Delivery 4", qty: 20 },
    { name: "Delivery 5", qty: 20 },
    { name: "Delivery 6", qty: 20 },
    { name: "Delivery 7", qty: 20 },
    { name: "Delivery 8", qty: 20 },
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

  return (
    <>
      <div className={master.main}>
        <div className={master.container}>
          <h2>Delivery System</h2>

          <div className={delivery.form}>
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
              <img alt="logo astra" src={logo} />
            </div>
          </div>

          <div className={delivery.form}>
            <div className={delivery.seventy}>
              <div className={delivery.input}>
                <div id={delivery.range}>
                  <button id={delivery.decrease}> - </button>
                  <input
                    type={"number"}
                    value={3}
                    min={"1"}
                    max={"8"}
                    id={"qtyScan"}
                    step="1"
                    readOnly
                  />
                  <button id={delivery.increase}> + </button>
                </div>
                <div id={delivery.display}>
                  <div className={tabs.tabsContainer}>
                    <div className={tabs.viewTab}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deliveries.map((delivery) => (
                            <tr key={delivery.name}>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Delivery;
