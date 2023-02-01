import "./css/Login.css";
import { useState } from "react";
const Login = (props) => {
  var showlogin = props.showlogin;
  var setShowlogin = props.setShowlogin;
  const ServerAddr = props.ServerAddr;
  var setLoginUsername = props.setLoginUsername;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function HandleChangeUsername(event) {
    setUsername(event.target.value);
  }
  function HandleChangePassword(event) {
    setPassword(event.target.value);
  }
  function clickOK(event) {
    let data = { username: username, password: password };

    fetch(ServerAddr + "/login", { method: "POST", body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setLoginUsername(username);
          setUsername("");
          setPassword("");
          setShowlogin(false);
        }
      });
  }
  return (
    <>
      {showlogin && (
        <>
          <div className="FormLogin">
            <div>Username : </div>{" "}
            <div>
              <input
                name="LoginUsername"
                value={username}
                onChange={HandleChangeUsername}
              />
            </div>
            <div>Password : </div>{" "}
            <div>
              <input
                name="LoginPassword"
                value={password}
                onChange={HandleChangePassword}
              />
            </div>
            <button className="button" onClick={clickOK}>
              <span>OK</span>
            </button>
          </div>
          <div className="backdroplogin" />
        </>
      )}
    </>
  );
};
export default Login;
