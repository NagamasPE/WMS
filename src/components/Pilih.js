import Table from "./Table";

const Pilih = (props) => {
  var Table_detail = props.Table_detail;
  var setTable_Detail = props.setTable_Detail;
  var addOpen = props.addOpen;
  var Table_Pilih = props.Table_Pilih;
  var inputOut = props.inputOut;
  var setInputOut = props.setInputOut;
  var generateDetail = props.generateDetail;
  var setPopUpOpen = props.setPopUpOpen;
  var TriggerRender = props.TriggerRender;

  function closePilihPopUp() {
    setPopUpOpen(false);
  }

  function HandleClickPilih(e) {
    const dat = e.target.getAttribute("item");

    if (Table_Pilih.todetail != undefined) {
      let input1 = Table_detail;
      TriggerRender();
      input1.val[Table_Pilih.todetail][Table_Pilih.tablename] =
        Table_Pilih.val[dat]["deskripsi"];
      // let rowPilih =Table_Pilih.val[dat]
      Table_Pilih.col.forEach((col) => {
        input1.val[Table_Pilih.todetail][col.name] =
          Table_Pilih.val[dat][col.name];
      });

      setTable_Detail(input1);
    } else {
      let input1 = inputOut;
      input1[Table_Pilih.tablename] = Table_Pilih.val[dat]["deskripsi"];
      input1[Table_Pilih.tablename.toLowerCase() + "_id"] =
        Table_Pilih.val[dat][Table_Pilih.tablename.toLowerCase() + "_id"];
      setInputOut(input1);
      generateDetail(input1, Table_Pilih.tablename);
    }

    closePilihPopUp();
    TriggerRender();
  }

  return (
    <>
      {addOpen && (
        <div className="modal">
          <Table
            Table_data={Table_Pilih}
            Table_name={"-"}
            HandleClick={HandleClickPilih}
          />
          <button className="button" onClick={closePilihPopUp}>
            Cancel
          </button>
        </div>
      )}
      {addOpen && <div className="backdrop" onClick={closePilihPopUp} />}
    </>
  );
};
export { Pilih };
