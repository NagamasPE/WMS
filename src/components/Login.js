import "./css/Login.css";
import { useState } from "react";
import Backdrop from "./Backdrop";

const Login = (props) => {
  var showlogin = props.showlogin;
  var setShowlogin = props.setShowlogin;

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
    setLoginUsername(username);
    setUsername("");
    setPassword("");
    setShowlogin(false);
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
              <span>Login</span>
            </button>
          </div>
        </>
      )}
      {showlogin && <Backdrop close={clickOK} />}
    </>
  );
};
export default Login;
