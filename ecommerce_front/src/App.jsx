import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./component/Home/Home";
import CreateGame from "./component/Admin/Forms/CreateGame";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createproduct" element={<CreateGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
