import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import print from "../css/Printing.module.css";

function PageToPrint(props) {
  var setCreateNote = props.setCreateNote;
  var summeries = props.data;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Trial Print",
    onAfterPrint: () => {
      alert("Print Success");
      setCreateNote(false);
    },
  });

  return (
    <>
      <div className={print.displayContainer}>
        <div ref={componentRef} className={print.printContainer}>
          <div className={print.row}>
            <div id={print.col1}>
              <div>PT. Astra Otopart TBK</div>
              <div>Nusametal Division</div>
            </div>
            <div id={print.col2}>
              <div>PO/PPIC/PPC/001 R:0</div>
              <div>Barcode PTV</div>
            </div>
          </div>

          <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            Delivery Note Outgoing Subcontracting
          </div>

          <div className={print.row}>
            <div id={print.col1}>
              <div>DN Number</div>
              <div>PTV Number</div>
              <div>Plant</div>
              <div>Vendor</div>
            </div>
            <div id={print.col1}>
              <div>Storage Loc</div>
              <div>Delivery Date</div>
              <div>Print By</div>
            </div>
          </div>

          <div className={print.row}>
            <table className={print.summeries}>
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

          <br />
          <div className={print.row} style={{ textTransform: "uppercase" }}>
            Driver: W 3024 UN
          </div>
          <br />

          <div className={print.row}>
            <div style={{ textAlign: "center" }}>
              <div>Vendor</div>
              <br />
              <br />
              <br />
              <div>
                {
                  "(...............................................................................)"
                }
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div>Approved By</div>
              <br />
              <br />
              <br />
              <div>
                {
                  "(...............................................................................)"
                }
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div>Warehouse</div>
              <br />
              <br />
              <br />
              <div>
                {
                  "(...............................................................................)"
                }
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
