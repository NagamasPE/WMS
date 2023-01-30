import { Route, Routes } from "react-router-dom";
import Input from "./pages/Input";
import Master from "./components/Master";
import io from "socket.io-client";
import Sidebar from "./components/layout/Sidebar";
import Main from "./pages/Main";
const socket = io.connect("https://npeserver.herokuapp.com/");
/*const socket = io.connect("http://" + config.ip_address + ":3001");*/

function App() {
  return (
    <div className="App navbar">
      <div>
        <Sidebar />
      </div>
      <div className="App content">
        <Routes basename="/wms_client">
          <Route path="/master/:tipe" element={<Master />} />
          <Route path="/main" element={<Main />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
