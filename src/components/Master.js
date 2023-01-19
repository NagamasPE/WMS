import { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./css/Master.module.css";

import { InputForm, myFunction } from "./InputForm";

const Master = (props) => {
  const TableQuery = {
    recipe: {
      query:
        "select p.recipe_id,p.produk_id,p.material_id,pr.deskripsi produk,no,m.deskripsi material,spec from recipe p left join produk pr on p.produk_id=pr.produk_id left join material m on p.material_id=m.material_id order by pr.deskripsi,p.no",
    },
    penimbangan_to: {
      query:
        "select p.*,pr.deskripsi produk,op.deskripsi operator,g.deskripsi grup from penimbangan_to p left join produk pr on p.produk_id=pr.produk_id left join grup g on p.grup_id=g.grup_id left join operator op on p.operator_id=op.operator_id",
      config: ["filter_tanggal"],
      detailquery: {
        config: ["bisa_tambah"],
        fieldname: "penimbangan_to_detail",
        query:
          "select p.material_id,deskripsi material,spec,actual,lot_no from penimbangan_to_detail p left join material m on p.material_id=m.material_id where p.penimbangan_to_id=@ID order by penimbangan_to_detail_id",
        textbox: ["material", "spec", "actual", "lot_no"],
        pilih: {
          contoh: "select *,deskripsi lot_no from produk",
        },
      },
    },
    planning: {
      query:
        "select pr.deskripsi produk,p.* from planning p left join produk pr on p.produk_id=pr.produk_id",
      config: ["filter_tanggal"],
    },
    material_masuk: {
      query: "select * from material_masuk ",
      config: ["filter_tanggal"],
      detailquery: {
        fieldname: "material_masuk_detail",
        query:
          "select p.material_id,m.deskripsi material,lot_no,value from material_masuk_detail p left join material m on p.material_id=m.material_id where material_masuk_id=@ID",
        config: ["bisa_tambah"],
        textbox: ["material", "lot_no", "value"],
        pilih: {
          contoh: "select *,deskripsi lot_no from produk",
        },
      },
      pilih: {
        contoh: "select * from contoh",
      },
    },
  };

  const ServerAeed4eeeedeeeee34r3sdeeeeddr = "https://npeserver.herokuapp.com/";
  const defTable = { col: [{ name: "empty" }], val: [{ empty: "" }] };

  const [inputOut, setInputOut] = useState({ empty: "" });
  const [ShowDetail, setShowDetail] = useState(0);
  const [Table_data, setTable_Data] = useState(defTable);
  const [nilai, setNilai] = useState(0);

  const [Table_detail, setTable_Detail] = useState(defTable);

  const params = useParams();

  let selectquery = `select * from ${params.tipe}`;
  let PilihQuery;
  let detailQuery;
  if (params.tipe in TableQuery) {
    if (TableQuery[params.tipe].query) {
      selectquery = TableQuery[params.tipe].query;
    }
    if (TableQuery[params.tipe].pilih) {
      PilihQuery = TableQuery[params.tipe].pilih;
    }
    if (TableQuery[params.tipe].detailquery) {
      detailQuery = TableQuery[params.tipe].detailquery;
    }
  }

  function checkColumnHasID(name, table) {
    var adaID = false;
    table.col.forEach((coldef) => {
      if (name + "_id" === coldef.name) {
        adaID = true;
      }
    });
    return adaID;
  }

  function TriggerRender() {
    var cnt = 0;
    cnt = nilai + 1;
    setNilai(cnt);
  }
  const generateData = () => {
    fetch(ServerAddr + "exec/" + selectquery)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if ("err" in data) {
            alert(data.err);
          } else {
            setTable_Data(data);
            console.log(data);
          }
        }
      });
  };
  if (Table_data.col) {
    if (Table_data.col[0].name === "empty") {
      generateData();
    }
  }

  return (
    <div className={classes.container}>
      <InputForm
        ServerAddr={ServerAddr}
        Table_data={Table_data}
        setTable_Data={setTable_Data}
        Table_detail={Table_detail}
        setTable_Detail={setTable_Detail}
        ShowDetail={ShowDetail}
        setShowDetail={setShowDetail}
        inputOut={inputOut}
        setInputOut={setInputOut}
        TriggerRender={TriggerRender}
        tipe={params.tipe}
        selectquery={selectquery}
        checkColumnHasID={checkColumnHasID}
        PilihQuery={PilihQuery}
        detailQuery={detailQuery}
      />
    </div>
  );
};

export default Master;
