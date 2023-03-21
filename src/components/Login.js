import classes from "./css/Login.module.css";
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
    console.log(data);
    fetch(ServerAddr + "/login", { method: "POST", body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          console.log(data.error);
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
          <div className={classes.animation}>
            <div className={classes.formLogin}>
              <h3>LOGIN</h3>
              <p>Enter Your Username & Password</p>
              <div className={classes.inputBox}>
                <input
                  name="LoginUsername"
                  value={username}
                  onChange={HandleChangeUsername}
                  required="required"
                  autoComplete="off"
                />
                <span>Username</span>
                <i></i>
              </div>
              <div className={classes.inputBox}>
                <input
                  name="LoginPassword"
                  value={password}
                  onChange={HandleChangePassword}
                  type="password"
                  required="required"
                />
                <span>Password</span>
                <i></i>
              </div>
              <button className={classes.buttonLogin} onClick={clickOK}>
                <span>Login</span>
              </button>
            </div>
          </div>
          <div className={classes.backdroplogin} />
        </>
      )}
    </>
  );
};
export default Login;
