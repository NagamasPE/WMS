import { Route, Routes } from "react-router-dom";
import Input from "./pages/Input";
import Master from "./components/Master";
import io from "socket.io-client";
import Sidebar from "./components/layout/Sidebar";
import Main from "./pages/Main";
import config from "./config.json";
const socket = io.connect("https://server-npe.herokuapp.com");
/*const socket = io.connect("http://" + config.ip_address + ":3001");*/

function App() {
  return (
    <div className="App">
      {/* <nav >
        <div>
        <a className="navbar" href="/master/operator">Master Operator</a>
        <a className="navbar" href="/master/produk">Master Produk</a>
        <a className="navbar" href="/master/material">Master Material</a>
        <a className="navbar" href="/master/recipe">Master Recipe</a>
        <a className="navbar" href="/master/grup">Master Grup</a>
        </div>
        <a className="navbar" href="/master/planning">Planning</a>
        <a className="navbar" href="/master/material_masuk">Material Masuk</a>
        <a className="navbar" href="/master/penimbangan_to">Penimbangan TO</a>
      </nav> */}
      <div id="nav">
        <Sidebar />
      </div>
      <div id="content">
        <Routes>
          <Route path="/master/:tipe" element={<Master />} />
          <Route path="/main" element={<Main />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
