import { useState } from "react";
import Axios from "axios";

function Inputs() {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);

  const addData = () => {
    Axios.post("http://localhost:3001/create", {
      name,
      value,
    }).then(() => {
      console.log("Data Sent");
    });
  };

  return (
    <div className="form">
      <div className="information">
        <label>Name: </label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Value: </label>
        <input
          type="number"
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </div>
      <br />
      <button className="button" onClick={addData}>
        <span>Enter</span>
      </button>
    </div>
  );
}

export default Inputs;
