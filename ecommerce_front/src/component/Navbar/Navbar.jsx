import React from 'react'
import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import heartIcon from '../../Photos/heartIconEmpty.svg'
import shoppingCart from '../../Photos/shoppingCart.svg'

const Navbar = () => {

  return (
    <div className={style.navBar}>
        <ul className={style.listFlex}>
            <li>
                <NavLink to='/sale' className={({isActive}) => (isActive ? style.active : style.disable)}>
                    Sale
                </NavLink>
            </li>
            <li>
                <NavLink to='/questions' className={({isActive}) => (isActive ? style.active : style.disable)}>
                    FAQ
                </NavLink>
            </li>
            <li>
                <NavLink to='/contact' className={({isActive}) => (isActive ? style.active : style.disable)}>
                    Contact Us
                </NavLink>
            </li>
            <li>
                <NavLink to='/games' className={({isActive}) => (isActive ? style.active : style.disable)}>
                    Games
                </NavLink>
            </li>
        </ul>
        <div className={style.navBarIcons}>
            <button className={style.heartIcon}>
                <img src={heartIcon} alt="heart Icon" width='30px' height='30px'/>
            </button>
            <button>
                <img src={shoppingCart} alt="Shopping cart" width='30px' height='30px'/>
            </button>
        </div>
    </div>
  )
}

export default Navbar