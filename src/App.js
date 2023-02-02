import { Route, Routes } from "react-router-dom";
import Input from "./pages/Input";
import Master from "./components/Master";
import Login from "./components/Login";
import io from "socket.io-client";
import Sidebar from "./components/layout/Sidebar";
import Main from "./pages/Main";
import React from "react";
import { useState, useRef, useEffect } from "react";
const socket = io.connect("https://npeserver.herokuapp.com/");
/*const socket = io.connect("http://" + config.ip_address + ":3001");*/

function App() {
  const ServerAddr = "https://npeserver.herokuapp.com";

  const [loginusername, setLoginUsername] = useState(true);
  const [showlogin, setShowlogin] = useState(true);


  return (
    <>
      <div className="App">
        <div>
          <Sidebar
            setShowlogin={setShowlogin}    
          />
        </div>
        <div className="App container">
          <div id="main">
            <Routes basename="/wms_client">
              <Route
                path="/master/:tipe"
                element={<Master ServerAddr={ServerAddr}/>}
              />
              <Route path="/main" element={<Main />} />
              <Route path="/input" element={<Input />} />
            </Routes>
          </div>
          <div id="foot">
            <div>
              <span>App By</span> Nagamas Putrajaya Engineering 2023
            </div>
          </div>
        </div>
        <Login
          showlogin={showlogin}
          setShowlogin={setShowlogin}
          loginusername={loginusername}
          setLoginUsername={setLoginUsername}
          ServerAddr={ServerAddr}
        />
      </div>
    </>
  );
}

export default App;
