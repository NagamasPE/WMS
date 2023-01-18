const TableDetail = (props) => {
  var detailTextbox = props.detailQuery.textbox;
  var detailConfig = props.detailQuery.config;
  var detailPilih = props.detailQuery.pilih;
  var Table_detail = props.Table_detail;
  var setTable_Detail = props.setTable_Detail;
  var TriggerRender = props.TriggerRender;
  var generatePilih = props.generatePilih;
  var checkColumnHasID = props.checkColumnHasID;
  function HandleDetailChange(event) {
    let input1 = Table_detail;
    TriggerRender();

    input1.val[event.target.getAttribute("row")][event.target.name] =
      event.target.value;
    setTable_Detail(input1);
  }
  function DeleteRow(rownumber) {
    let input1 = Table_detail;
    input1.val.splice(rownumber, 1);
    setTable_Detail(input1);
    TriggerRender();
  }
  function AddNewRow(e) {
    let input1 = Table_detail;
    let newrow = {};
    Table_detail.col.forEach((col) => {
      newrow[col.name] = "";
    });
    input1.val.push(newrow);
    console.log(input1);
    setTable_Detail(input1);
    TriggerRender();
  }
  return (
    <>
      {Table_detail &&
        Table_detail.col &&
        Table_detail.col[0].name !== "empty" && (
          <table className="table">
            <thead>
              <tr>
                <th>NO</th>
                {Table_detail.col
                  ? Table_detail.col.map(
                      (col) =>
                        col.name.includes("_id") === false && (
                          <th key={col.name}>{col.name.toUpperCase()}</th>
                        )
                    )
                  : "Not Found"}
              </tr>
            </thead>
            <tbody>
              {Table_detail.val.map((val) => (
                <tr key={Table_detail.val.indexOf(val)}>
                  <td>{Table_detail.val.indexOf(val) + 1}</td>
                  {Table_detail.col.map(
                    (col) =>
                      col.name.includes("_id") === false && (
                        <td key={col.name} item={Table_detail.val.indexOf(val)}>
                          {detailTextbox.includes(col.name) ? (
                            <>
                              {checkColumnHasID(col.name, Table_detail) ||
                              col.name in detailPilih ? (
                                <input
                                  row={Table_detail.val.indexOf(val)}
                                  name={col.name}
                                  onClick={() =>
                                    generatePilih(
                                      col.name,
                                      Table_detail.val.indexOf(val)
                                    )
                                  }
                                  readOnly
                                  value={val[col.name]}
                                />
                              ) : (
                                <input
                                  row={Table_detail.val.indexOf(val)}
                                  name={col.name}
                                  onChange={HandleDetailChange}
                                  value={val[col.name]}
                                />
                              )}
                            </>
                          ) : (
                            val[col.name]
                          )}
                        </td>
                      )
                  )}
                  <td>
                    {detailConfig && detailConfig.includes("bisa_tambah") && (
                      <button
                        className="button"
                        onClick={() => {
                          DeleteRow(Table_detail.val.indexOf(val));
                        }}
                      >
                        <span>X</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      {detailConfig && detailConfig.includes("bisa_tambah") && (
        <div>
          <button className="button" onClick={AddNewRow}>
            <span>ADD NEW ROW</span>
          </button>
        </div>
      )}
    </>
  );
};
export default TableDetail;
