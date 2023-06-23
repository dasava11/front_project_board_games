import React from 'react'
import searchIcon from '../../Photos/search_icon.svg'
import style from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <div>
        <input className={style.inputSearch} type="text" />
        <button className={style.searchBtn}>
            <img src={searchIcon} alt="search button" width='15px' height='15px'/>
        </button>
    </div>
  )
}

export default SearchBar