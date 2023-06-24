import React from 'react'
import logo from '../../Photos/logo.png'
import dice1 from '../../Photos/dice_1.svg'
import dice4 from '../../Photos/dice_4.svg'
import SearchBar from '../SearchBar/SearchBar'
import style from './Header.module.css'
import Navbar from '../Navbar/Navbar'
const Header = () => {

  return (
    <div>
        <div className={style.headerFlex}>
            <img src={logo} alt="logo" width='195px' height='109.68px'/>
            <div className={style.inputsSB}>
                <SearchBar/>
                <div className={style.inputs}>
                    <button>
                        <img src={dice1} alt="sign un" width='45px' height='45px' />
                        <h6>Sign Up</h6>
                    </button>
                    <button>
                        <img src={dice4} alt="log In" width='45px' height='45px' />
                        <h6>Log In</h6>
                    </button>
                </div>
            </div>
        </div>
        <Navbar/>
    </div>
    
  )
}

export default Header