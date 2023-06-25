import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CreateGame from "./components/Admin/Forms/CreateGame";
import Home from "./components/Home/Home";
import Games from "./components/Games/Games";
import CardDetail from "./components/CardDetail/CardDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createproduct" element={<CreateGame />} />
          <Route path="/games" element={<Games />} />
          <Route path="details/:id" element={<CardDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
