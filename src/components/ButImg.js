import component from "./css/Component.module.css";

function ButImg(props) {
  var setCreateNote = props.setCreateNote;

  function clickHandle() {
    setCreateNote(true);
  }

  return (
    <>
      <div
        className={component.rect}
        style={{ width: `${props.width}%`, height: `${props.height}%` }}
      >
        <button onClick={clickHandle}>
          <div className={component.container}>
            <img alt={`${props.alt}`} src={`${props.dir}`} />
            {/* <img alt="trial" src={closeGate}/> */}
            <div>{props.caption}</div>
          </div>
        </button>
      </div>
    </>
  );
}

export default ButImg;
