import { useState } from "react";
import { Pilih } from "./Pilih";
import TableDetail from "./TableDetail";
import Table from "./Table";

const InputForm = (props) => {
  const defTable = { col: [{ name: "empty" }], val: [{ empty: "" }] };
  const [Table_Pilih, setTable_Pilih] = useState(defTable);
  const [addOpen, setPopUpOpen] = useState(false);
  const [DeleteMode, setDeleteMode] = useState(0);
  var ServerAddr = props.ServerAddr;
  var PilihQuery = props.PilihQuery;
  var selectquery = props.selectquery;
  var detailQuery = props.detailQuery;
  var tipe = props.tipe;
  var Table_data = props.Table_data;
  var setTable_Data = props.setTable_Data;
  var Table_detail = props.Table_detail;
  var setTable_Detail = props.setTable_Detail;
  var TriggerRender = props.TriggerRender;
  var ShowDetail = props.ShowDetail;
  var setShowDetail = props.setShowDetail;
  var inputOut = props.inputOut;
  var setInputOut = props.setInputOut;
  var checkColumnHasID = props.checkColumnHasID;

  const generateDetail = (data, tablename) => {
    if (tablename == detailQuery.fieldname || tablename == undefined) {
      if (detailQuery.query) {
        var id = 0;
        if (data != undefined && data[detailQuery.fieldname + "_id"]) {
          id = data[detailQuery.fieldname + "_id"];
        }
        console.log(
          "Generate Detail:" + detailQuery.query.replaceAll("@ID", id)
        );
        fetch(
          "http://" +
            ServerAddr +
            ":3001/exec/" +
            detailQuery.query.replaceAll("@ID", id)
        )
          .then((response) => response.json())
          .then((data) => {
            {
              if ("err" in data) {
                alert(data.err);
              } else {
                setTable_Detail(data);
              }
            }
          });
      }
    }
  };

  function showAddPopUp() {
    setShowDetail(1);
  }

  function HandleTambah(e) {
    let input1 = inputOut;
    Table_data.col.forEach((colname) => {
      input1[colname.name] = "";
    });

    setInputOut(input1);
    setDeleteMode(0);
    showAddPopUp();
  }

  function HandleClick(e) {
    const dat = e.target.getAttribute("item");

    let input1 = inputOut;

    Table_data.col.forEach((colname) => {
      if (Table_data.val[dat][colname.name] === null) {
        input1[colname.name] = "";
      } else {
        input1[colname.name] = Table_data.val[dat][colname.name];
      }
    });
    setDeleteMode(1);
    generateDetail(input1);
    setInputOut(input1);
    showAddPopUp();
  }

  const generatePilih = (tipe, todetail) => {
    var query = "select * from " + tipe.toLowerCase() + " order by deskripsi";
    if (Table_Pilih.todetail == undefined) {
      if (PilihQuery) {
        if (tipe in PilihQuery) {
          query = PilihQuery[tipe];
        }
      }
    } else {
      if (detailQuery.pilih) {
        if (tipe in detailQuery.pilih) {
          query = detailQuery.pilih[tipe];
        }
      }
    }

    fetch("http://" + ServerAddr + ":3001/exec/" + query)
      .then((response) => response.json())
      .then((data) => {
        data.todetail = todetail;
        data.tablename = tipe;
        setTable_Pilih(data);
        setPopUpOpen(true);
      });
  };

  function closeAddPopUp() {
    setShowDetail(0);
  }

  const deleteData = () => {
    var updateVal = "";
    var querycol = "";
    Table_data.col.forEach((col) => {
      if (col.name === tipe + "_id") {
        if (inputOut[col.name] !== "" && inputOut[col.name] !== undefined) {
          updateVal = " where " + col.name + "=" + inputOut[col.name];
        }
      }
    });
    if (updateVal !== "") {
      querycol = "delete from " + tipe + " " + updateVal;
      fetch(
        "http://" + ServerAddr + ":3001/insert/" + querycol + "/" + selectquery
      )
        .then((response) => response.json())
        .then((data) => {
          setTable_Data(data);
          closeAddPopUp();
        });
      // props.socket.emit('insert',{insert:querycol,select:'select * from '+params.tipe})
      // console.log(querycol)
    }
  };
  const addData = () => {
    // console.log(Table_data);
    var querycol = "";
    var queryval = "";
    var updateVal = "";
    Table_data.col.forEach((col) => {
      var adaID = checkColumnHasID(col.name, Table_data);
      if (col.name === tipe + "_id") {
        if (inputOut[col.name] !== "" && inputOut[col.name] !== undefined) {
          updateVal = " where " + col.name + "=" + inputOut[col.name];
        }
      }
      if (updateVal !== "") {
        if (col.name !== tipe + "_id" && adaID === false) {
          if (querycol !== "") {
            querycol += ",";
          }

          querycol += col.name + "='" + inputOut[col.name] + "'";
        }
      } else {
        if (col.name !== tipe + "_id" && adaID === false) {
          if (querycol !== "") {
            querycol += ",";
            queryval += ",";
          }
          querycol += col.name;
          queryval += "'" + inputOut[col.name] + "'";
        }
      }
    });
    if (updateVal !== "") {
      querycol = "update " + tipe + " set " + querycol + updateVal;
    } else {
      querycol =
        "insert into " + tipe + " (" + querycol + ") values (" + queryval + ")";
    }

    // props.socket.emit('insert',{insert:querycol,select:'select * from '+params.tipe})
    fetch(
      "http://" + ServerAddr + ":3001/insert/" + querycol + "/" + selectquery
    )
      .then((response) => response.json())
      .then((data) => {
        setTable_Data(data);
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          closeAddPopUp();
        }
      });
  };

  function HandleChange(event) {
    let input1 = inputOut;
    TriggerRender();
    input1[event.target.name] = event.target.value;
    setInputOut(input1);
  }

  return (
    <>
      {ShowDetail === 1 && (
        <div className="inputform">
          <table>
            <tbody>
              {Table_data.col.map((col) => (
                <tr key={col.name}>
                  {col.name.indexOf("_id") === -1 && (
                    <>
                      <td>{col.name.toUpperCase().replaceAll("_", " ")}</td>
                      <td>
                        {checkColumnHasID(col.name, Table_data) ? (
                          <input
                            onClick={() => generatePilih(col.name)}
                            name={col.name}
                            value={inputOut[col.name]}
                            readOnly
                          />
                        ) : (
                          <input
                            name={col.name}
                            value={inputOut[col.name]}
                            onChange={HandleChange}
                          />
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <TableDetail
            detailQuery={detailQuery}
            Table_detail={Table_detail}
            setTable_Detail={setTable_Detail}
            TriggerRender={TriggerRender}
            generatePilih={generatePilih}
            checkColumnHasID={checkColumnHasID}
          />

          <button className="button" onClick={addData}>
            <span>SAVE</span>
          </button>
          {DeleteMode === 1 && (
            <button className="button" onClick={deleteData}>
              <span>DELETE</span>
            </button>
          )}
          <button className="button" onClick={closeAddPopUp}>
            <span>CANCEL</span>
          </button>
        </div>
      )}
      {ShowDetail === 1 && (
        <div className="backdropinput" onClick={closeAddPopUp} />
      )}
      <Pilih
        addOpen={addOpen}
        Table_Pilih={Table_Pilih}
        setTable_Pilih={setTable_Pilih}
        Table_detail={Table_detail}
        setTable_Detail={setTable_Detail}
        setPopUpOpen={setPopUpOpen}
        inputOut={inputOut}
        setInputOut={setInputOut}
        generateDetail={generateDetail}
        TriggerRender={TriggerRender}
      />

      <>
        {Table_data && Table_data.col && (
          <div className="tableform">
            <Table Table_data={Table_data} HandleClick={HandleClick} />

            <button className="button" onClick={HandleTambah}>
              <span>ADD NEW</span>
            </button>
          </div>
        )}
      </>
    </>
  );
};

const myFunction = () => {
  console.log("This function can be accessed from outside the component.");
};
export { InputForm, myFunction };
