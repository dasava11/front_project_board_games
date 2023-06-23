import './App.css'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './component/Home/Home'
import Games from './component/Games/Games';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/games' element={<Games/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
