import { Route, Routes } from "react-router-dom";
import Input from "./pages/Input";
import Master from "./components/Master";
import io from "socket.io-client";
import Sidebar from "./components/layout/Sidebar";
import Main from "./pages/Main";
import { useState } from "react";
import Login from "./components/Login";
const socket = io.connect("https://npeserver.herokuapp.com/");
/*const socket = io.connect("http://" + config.ip_address + ":3001");*/

function App() {
  const [loginusername, setLoginUsername] = useState(true);
  const [showlogin, setShowlogin] = useState(true);
  function clickLogin(event) {
    setShowlogin(true);
  }
  return (
    <div className="App">
      <div>
        <Sidebar />
        <button className="button" onClick={clickLogin}>
          <span>LOGIN {loginusername}</span>
        </button>
      </div>
      <div id="content">
        <Routes basename="/wms_client">
          <Route path="/master/:tipe" element={<Master />} />
          <Route path="/main" element={<Main />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </div>
      <Login
        showlogin={showlogin}
        setShowlogin={setShowlogin}
        loginusername={loginusername}
        setLoginUsername={setLoginUsername}
      />
    </div>
  );
}

export default App;
