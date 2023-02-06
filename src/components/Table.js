const Table = (props) => {
  return (
    <>
      {props.Table_data && props.Table_data.col && (
        <table className="table">
          <thead>
            <tr>
              {props.Table_data.col &&
                props.Table_data.col.map(
                  (col) =>
                    col.name.indexOf("_id") === -1 && (
                      <th key={col.name}>
                        {col.name.toUpperCase().replaceAll("_", " ")}
                      </th>
                    )
                )}
            </tr>
          </thead>
          <tbody>
            {props.Table_data.val &&
              props.Table_data.val.map((val) => (
                <tr
                  key={props.Table_data.val.indexOf(val)}
                  onClick={props.HandleClick}
                >
                  {props.Table_data.col.map(
                    (col) =>
                      col.name.indexOf("_id") === -1 && (
                        <td
                          key={col.name}
                          item={props.Table_data.val.indexOf(val)}
                        >
                          {/* (col.type===12) */}
                          {col.type === 12 ? (
                            <>
                              {val[col.name]
                                .replaceAll("T", " ")
                                .replaceAll("Z", "")}
                            </>
                          ) : (
                            <>{val[col.name]}</>
                          )}
                        </td>
                      )
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
