import Product from "./product";

function AddPopUp(props) {
  function cancelHandler() {
    props.cancel();
  }

  function confirmHandler() {
    props.confirm();
  }

  return (
    <div className="modal">
      <p>
        <b>Please Pick Product Below: </b>
      </p>
      <div className="pickPro">
        <Product
          name="Ban 1"
          id="2A"
          category="All Terrain"
          material="rubber1"
        />
        <Product
          name="Ban 2"
          id="3C"
          category="Mud Terrain"
          material="rubber5"
        />
        <Product
          name="Ban 3"
          id="1A"
          category="Highway Terrain"
          material="rubber4"
        />
        <Product
          name="Ban 4"
          id="2A"
          category="All Terrain"
          material="rubber1"
        />
      </div>

      <br />

      <button className="btn btn--alt" onClick={cancelHandler}>
        Cancel
      </button>
      <button className="btn" onClick={confirmHandler}>
        Confirm
      </button>
    </div>
  );
}

export default AddPopUp;
