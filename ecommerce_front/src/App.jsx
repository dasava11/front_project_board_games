import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CreateGame from "./components/Admin/Forms/CreateGame";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
import CardDetail from "./components/CardDetail/CardDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createproduct" element={<CreateGame />} />
          <Route path="/games" element={<Games />} />
          <Route path="details/:id" element={<CardDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
