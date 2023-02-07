import { useState } from "react";
import { Pilih } from "./Pilih";
import TableDetail from "./TableDetail";
import Table from "./Table";
import Backdrop from "./Backdrop";
import classes from "./css/Popup.module.css";
import tables from "./css/Chart.module.css";

const InputForm = (props) => {
  const defTable = { col: [{ name: "empty" }], val: [{ empty: "" }] };
  const [oldTipe, setOldTipe] = useState("");
  const [Table_Pilih, setTable_Pilih] = useState(defTable);
  const [addOpen, setPopUpOpen] = useState(false);
  const [DeleteMode, setDeleteMode] = useState(0);
  const [waktuDari, setWaktuDari] = useState("2023-01-01");
  const [waktuHingga, setWaktuHingga] = useState("2023-01-01");
  var ServerAddr = props.ServerAddr;
  var PilihQuery = props.PilihQuery;
  var selectquery = props.selectquery;
  var detailQuery = props.detailQuery;
  var configQuery = props.configQuery;
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
  var checkColumnFromTable = props.checkColumnFromTable;
  var today = new Date();
  
  var month = today.getMonth() + 1;
  var monthStr = month.toString();
  if (monthStr.length === 1) {
    monthStr = "0" + monthStr;
  }
  var dateStr = today.getDate().toString();
  if (dateStr.length === 1) {
    dateStr = "0" + dateStr;
  }

 

  let string = `${tipe}`;
  string = string.replace("_", " ");
  var fetching = props.fetching;
  
  function AddZero(input1,length){
      var input=input1.toString();
      while (input.length<length){
        input="0"+input;
      }
      return input;
  }
  const fullwaktu = today.getFullYear() + "-" + monthStr + "-" + dateStr+" "+AddZero(today.getHours(),2)+":"+AddZero(today.getMinutes(),2)+":"+AddZero(today.getSeconds(),2)+"."+AddZero(today.getMilliseconds(),3)
  
  const generateData = () => {
    fetching(true);
    fetch(ServerAddr + "/exec/" + selectquery)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetching(false);
          if ("err" in data) {
            alert(data.err);
          } else {
            setTable_Data(data);
            
          }
        }
      });
  };

  if (oldTipe !== tipe) {
    setOldTipe(tipe);
    generateData();

    setWaktuDari(today.getFullYear() + "-" + monthStr + "-" + dateStr);
    setWaktuHingga(
      today.getFullYear() + "-" + monthStr + "-" + dateStr
    );
  }

  const generateDetail = (data, tablename) => {
    if (detailQuery && detailQuery.fieldname) {
      if (tablename == detailQuery.fieldname || tablename == undefined) {
        if (detailQuery.query) {
          var id = 0;
          if (data != undefined && data[tipe + "_id"]) {
            id = data[tipe + "_id"];
          }
          
          fetching(true);
          
          fetch(ServerAddr + "/exec/" + detailQuery.query.replaceAll("@ID", id))
            .then((response) => response.json())
            .then((data) => {
              {
                fetching(false);
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
  function tambah(kode){
    closeAddPopUp();
    let input1 = inputOut;
    Table_data.col.forEach((colname) => {
      input1[colname.name] = "";
    });
    generateDetail(input1);
    if (checkColumnFromTable("waktu",Table_data)){
      
      input1["waktu"]=fullwaktu;
    }    
    if (kode){
      input1["kode"]=kode;
    }
    setInputOut(input1);
    
    setDeleteMode(0);
    showAddPopUp();
   
  }
  function HandleTambah(e) {
    fetching(true);
    
    if (checkColumnFromTable("kode",Table_data)){
      fetch(ServerAddr + "/getkode/"+tipe+"/"+today.getFullYear().toString().substring(2) +monthStr, {
        method: "GET"
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.kode){
            
            tambah(data.kode);
            
          }
          
            
        });
    }else{
      tambah();
    }
    

   
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
    fetching(true);
    fetch(ServerAddr + "/exec/" + query)
      .then((response) => response.json())
      .then((data) => {
        data.todetail = todetail;
        data.tablename = tipe;
        fetching(false);
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
    fetching(true);
    fetch(ServerAddr + "/delete", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        fetching(false);
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
    fetching(true);
    // console.log(inputOut);
    fetch(ServerAddr + "/update", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        fetching(false);
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

  function HandleChangeDari(event) {
    setWaktuDari(event.target.value);
    console.log("Change Dari");
  }
  function HandleChangeHingga(event) {
    setWaktuHingga(event.target.value);
    console.log("Change Hingga");
  }
  function AddNewRowDetail(e){
    let input1 = Table_detail;
    let newrow = {}
    Table_detail.col.forEach(col=>{            
        newrow[col.name]="";
    });       
    input1.val.push(newrow);
    setTable_Detail(input1);
    TriggerRender();
}
  return (
    <>
      <>
        <div className={tables.tabTitle}>Table of {string}</div>
        {Table_data && Table_data.col && (
          <div className={tables.tabsContainer}>
            {configQuery && "filter_tanggal" in configQuery && (
              <div className={tables.filter}>
                FILTER :
                <input
                  name="tabledari"
                  type="date"
                  value={waktuDari}
                  onChange={HandleChangeDari}
                />
                S/D
                <input
                  name="tablehingga"
                  type="date"
                  value={waktuHingga}
                  onChange={HandleChangeHingga}
                />
              </div>
            )}
            <div className={tables.viewTab}>
              <Table Table_data={Table_data} HandleClick={HandleClick} />
            </div>
            <div>
              <button className="button" onClick={HandleTambah}>
                <span>ADD NEW</span>
              </button>
            </div>
          </div>
        )}
      </>

      {ShowDetail === 1 && <Backdrop/>}

      {ShowDetail === 1 && (
        <div className={classes.modal}>
        <div className={tables.tabTitle}>Table of {string}</div>
          <table>
            <tbody>
              {Table_data.col.map((col) => (
                <tr key={col.name}>
                  {col.name.indexOf("_id") === -1 && (
                    <>
                      <td className={classes.title}>
                        {col.name.toUpperCase().replaceAll("_", " ")}
                      </td>
                      <td className={classes.input}>
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
                                value={inputOut[col.name].replaceAll("Z", "")}
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

          <div className={classes.buttons}>
            <button className="button" onClick={addData}>
              <span>SAVE</span>
            </button>
            <button className="button" onClick={closeAddPopUp}>
              <span>CANCEL</span>
            </button>
            {detailQuery && detailQuery.config && detailQuery.config.includes("bisa_tambah")&&
            <button className="button" onClick={AddNewRowDetail}>
                <span>ADD NEW ROW</span>
            </button>}
            {DeleteMode === 1 && (
              <button className="button" onClick={deleteData}>
                <span>DELETE</span>
              </button>
            )}

            
          </div>
        </div>
      )}
      {/* {ShowDetail === 1 && (
        <div className="backdropinput" onClick={closeAddPopUp} />
      )} */}
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
