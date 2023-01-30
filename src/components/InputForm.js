import { useState } from "react";
import { Pilih } from "./Pilih";
import TableDetail from "./TableDetail";
import Table from "./Table";
import Backdrop from "./Backdrop";
import classes from "./css/Popup.module.css";
import tables from "./css/Chart.module.css";

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

  let string = `${tipe}`;
  string = string.replace("_", " ");

  const generateDetail = (data, tablename) => {
    if (detailQuery && detailQuery.fieldname) {
      if (tablename == detailQuery.fieldname || tablename == undefined) {
        if (detailQuery.query) {
          var id = 0;
          if (data != undefined && data[tipe + "_id"]) {
            id = data[tipe + "_id"];
          }
          console.log(
            "Generate Detail:" + detailQuery.query.replaceAll("@ID", id)
          );
          fetch(ServerAddr + "exec/" + detailQuery.query.replaceAll("@ID", id))
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

    fetch(ServerAddr + "exec/" + query)
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
    let data = {
      Table_detail: Table_detail,
      table_col: Table_data.col,
      inputOut: inputOut,
      tipe: tipe,
      selectquery: selectquery,
    };
    fetch(ServerAddr + "delete", { method: "POST", body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setTable_Data(data);
          closeAddPopUp();
        }
      });
  };
  const addData = () => {
    let data = {
      Table_detail: Table_detail,
      table_col: Table_data.col,
      inputOut: inputOut,
      tipe: tipe,
      selectquery: selectquery,
    };
    // console.log(inputOut);
    fetch(ServerAddr + "update", { method: "POST", body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setTable_Data(data);
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
      <>
        <div className={tables.tabTitle}>Table of {string}</div>
        {Table_data && Table_data.col && (
          <div className={tables.tabsContainer}>
            <div className={tables.filter}>
              FILTER
              <input name="tabledari" type="date" />
              S/D
              <input name="tablehingga" type="date" />
            </div>
            <Table Table_data={Table_data} HandleClick={HandleClick} />

            <button className="button" onClick={HandleTambah}>
              <span>ADD NEW</span>
            </button>
          </div>
        )}
      </>

      {ShowDetail === 1 && <Backdrop cancel={closeAddPopUp} />}

      {ShowDetail === 1 && (
        <div className={classes.inputform}>
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
                          <>
                            {col.type === 12 ? (
                              <input
                                name={col.name}
                                value={inputOut[col.name]}
                                onChange={HandleChange}
                                type="datetime-local"
                              />
                            ) : (
                              <input
                                name={col.name}
                                value={inputOut[col.name]}
                                onChange={HandleChange}
                              />
                            )}
                          </>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {detailQuery && (
            <TableDetail
              detailQuery={detailQuery}
              Table_detail={Table_detail}
              setTable_Detail={setTable_Detail}
              TriggerRender={TriggerRender}
              generatePilih={generatePilih}
              checkColumnHasID={checkColumnHasID}
            />
          )}

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
    </>
  );
};

const myFunction = () => {
  console.log("This function can be accessed from outside the component.");
};
export { InputForm, myFunction };
