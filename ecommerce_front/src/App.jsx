import './App.css'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './component/Home/Home'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
