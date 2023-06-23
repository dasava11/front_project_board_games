import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import CreateGame from "./components/Admin/Forms/CreateGame";
import Home from './component/Home/Home'
import Games from './component/Games/Games';
import CardDetail from "./components/CardDetail/CardDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createproduct" element={<CreateGame />} />
          <Route path="/games" element={<Games />} />
          <Route path="details/:id" element={<CardDetail />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
