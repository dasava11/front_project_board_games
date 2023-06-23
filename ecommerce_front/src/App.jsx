import './App.css'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './component/Home/Home'
import Games from './component/Games/Games';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/games' element={<Games/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
