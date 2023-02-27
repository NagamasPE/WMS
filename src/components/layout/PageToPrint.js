import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import print from "../css/Printing.module.css";
import Barcode from "react-barcode";
import QrGenerator from "../QrGenerator";
import logo from "../../pages/image/logo.png";
import BufferToImg from "../BufferToImg";

function PageToPrint(props) {
  var setCreateNote = props.setCreateNote;
  var summeries = props.data;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Trial Print",
    //onAfterPrint: () => {
    //alert("Print Success");
    //setCreateNote(false);
    //s},
  });

  const serverAddr = "http://localhost:3001";
  const defTable = { col: [{ name: "empty" }], val: [{ empty: "" }] };
  const [Table_data, setTable_Data] = useState(defTable);

  let selectQuery = "select * from ti_gambar_safety";
  const generateData = () => {
    fetch(serverAddr + "/exec/" + selectQuery)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if ("err" in data) {
            alert(data.err);
          } else {
            //setTable_Data(data);
          }
        }
      });
  };
  generateData();

  return (
    <>
      <div className={print.displayContainer}>
        <div ref={componentRef} className={print.printContainer}>
          {setCreateNote && (
            <div className={print.kop}>
              <div className={print.row}>
                <div id={print.col1}>
                  <div>PT. Astra Otopart TBK</div>
                  <div>Nusametal Division</div>
                </div>
                <div id={print.barcode}>
                  <div id={print.formDetail}>PO/PPIC/PPC/001 R:0 ms_edge</div>
                  <div>
                    <Barcode
                      value="(21)21667788"
                      format="CODE128"
                      width={1.5}
                      height={30}
                      displayValue={false}
                      margin={0}
                    />
                    {/* <QrGenerator value="(21)21667788" /> */}
                  </div>
                </div>
              </div>
              <div className={print.row}>
                <div className={print.docTitle}>
                  Delivery Note Outgoing Subcontracting
                </div>
              </div>

              <div className={print.row}>
                <div id={print.col1}>
                  <div>
                    <div id={print.title}>DN Number</div>
                    <div id={print.value}>12345</div>
                  </div>
                  <div>
                    <div id={print.title}>PTV Number</div>
                    <div id={print.value}>12345</div>
                  </div>
                  <div>
                    <div id={print.title}>Plant</div>
                    <div id={print.value}>12345</div>
                  </div>
                  <div>
                    <div id={print.title}>Vendor</div>
                    <div id={print.value}>12345</div>
                  </div>
                </div>
                <div id={print.col2}>
                  <div>
                    <div id={print.title}>Storage Loc</div>
                    <div id={print.value}>12345</div>
                  </div>
                  <div>
                    <div id={print.title}>Delivery Date</div>
                    <div id={print.value}>12345</div>
                  </div>
                  <div>
                    <div id={print.title}>Print By</div>
                    <div id={print.value}>12345</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={print.isi}>
            <div className={print.row}>
              <table className={print.summeries}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Material Number</th>
                    <th>
                      <div>Material Description</div>
                    </th>
                    <th>Package</th>
                    <th>Quantity</th>
                    <th>SLOC</th>
                  </tr>
                </thead>
                <tbody>
                  {summeries.slice(0, 14).map((delivery, index) => (
                    <tr key={delivery.name}>
                      <td>{delivery.no}</td>
                      <td>{delivery.material}</td>
                      <td>{delivery.desc}</td>
                      <td>{delivery.pack}</td>
                      <td>{delivery.qty}</td>
                      <td>{delivery.sloc}</td>
                    </tr>
                  ))}
                  {summeries.slice(0, 14).length === 0 && (
                    <tr>
                      <td colSpan="6">No data found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className={print.isi}>
            <div className={print.row}>
              <table className={print.summeries}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Material Number</th>
                    <th>
                      <div>Material Description</div>
                    </th>
                    <th>Package</th>
                    <th>Quantity</th>
                    <th>SLOC</th>
                  </tr>
                </thead>
                <tbody>
                  {summeries.slice(14, 28).map((delivery, index) => (
                    <tr key={delivery.name}>
                      <td>{delivery.no}</td>
                      <td>{delivery.material}</td>
                      <td>{delivery.desc}</td>
                      <td>{delivery.pack}</td>
                      <td>{delivery.qty}</td>
                      <td>{delivery.sloc}</td>
                    </tr>
                  ))}
                  {summeries.slice(14, 28).length === 0 && (
                    <tr>
                      <td colSpan="6">No data found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/*<div className={print.row}>
                    <table
                      style={{
                        width: "100%",
                        border: "1px solid",
                        textAlign: "center",
                      }}
                    >
                      <thead>
                        <tr>
                          <th>
                            <div>Gambar</div>
                            <div>Detail</div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {Table_data.val.map((val) => (
                          <tr>
                            <td>
                              <BufferToImg
                                buffer={val.gambar}
                                key={val.index}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>*/}

          <div className={print.isi}>
            <div className={print.row} style={{ textTransform: "uppercase" }}>
              <div style={{ fontWeight: "bold" }}>Driver:</div>
              <div>W 3024 UN</div>
            </div>

            <div className={print.row}>
              <div id={print.sign}>
                <div>
                  <div>Vendor</div>
                  <div id={print.signName}>
                    {
                      "(........................................................)"
                    }
                  </div>
                </div>
                <div>
                  <div>Approved By</div>
                  <div id={print.signName}>
                    {
                      "(........................................................)"
                    }
                  </div>
                </div>
                <div>
                  <div>Warehouse</div>
                  <div id={print.signName}>
                    {
                      "(........................................................)"
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <button onClick={handlePrint}>Print Travel Document!</button>
    </>
  );
}

export default PageToPrint;
