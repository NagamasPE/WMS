import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import print from "../css/Printing.module.css";

function PageToPrint(props) {
  var setCreateNote = props.setCreateNote;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Trial Print",
    onAfterPrint: () => {
      alert("Print Success");
      setCreateNote(false);
    },
  });

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
    {
      no: 11,
      material: 123,
      desc: "Material 1",
      pack: "A1",
      qty: 1,
      sloc: "asd",
    },
    {
      no: 12,
      material: 123,
      desc: "Material 2",
      pack: "A1",
      qty: 5,
      sloc: "asd",
    },
    {
      no: 13,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 14,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 15,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 16,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 17,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 18,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 19,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
    {
      no: 20,
      material: 345,
      desc: "Material 3",
      pack: "A1",
      qty: 10,
      sloc: "asd",
    },
  ];

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
      <button onClick={handlePrint}>Print This!</button>
    </>
  );
}

export default PageToPrint;
