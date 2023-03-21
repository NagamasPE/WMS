import { Route, Routes } from "react-router-dom";
import Input from "./pages/Input";
import Production from "./pages/Production";
import Delivery from "./pages/Delivery"
import Master from "./components/Master";
import Login from "./components/Login";
import io from "socket.io-client";
import Sidebar from "./components/layout/Sidebar";
import Main from "./pages/Main";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Inspection from "./pages/Inspection";
/*const socket = io.connect("https://nagamasjaya.co.id/wms/");*/
/*const socket = io.connect("http://" + config.ip_address + ":3001");*/

function App() {
  const ServerAddr = "https://nagamasjaya.co.id/wms";
  // const ServerAddr = "http://localhost:3001";
  const [open, openMenu] = useState(false);
  const [loginusername, setLoginUsername] = useState(true);
  const [showlogin, setShowlogin] = useState(false);

  function HandleClick(e) {
    openMenu(false);
  }
  return (
    <>
      <div className="App">
        <div className="navbar">
          <Sidebar
            loginusername={loginusername}
            setShowlogin={setShowlogin}   
            open={open} 
            openMenu={openMenu}  
          />
        </div>
        <div className="container" onClick={HandleClick}>
          <div id="main">
            <Routes basename="/wms_client">
              <Route
                path="/master/:tipe"
                element={<Master ServerAddr={ServerAddr}/>}
              />
              <Route path="/main" element={<Main />} />
              <Route path="/input" element={<Input />} />
              <Route path="/production" element={<Production />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/inspection" element={<Inspection />} />
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
