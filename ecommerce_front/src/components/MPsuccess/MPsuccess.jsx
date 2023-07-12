import React from 'react'
import foto from '../../Photos/Canasta.png'
import { Link } from 'react-router-dom'
import style from './MPsuccess.module.css'

const MPsuccess = () => {
  return (
    <div className={style.mpSuccessContainer}>
        <h1>Thanks for buying</h1>
        <img src={foto} alt="foto" />
        <Link to='/games' className={style.MPsuccessBtn}>See more</Link>
    </div>
  )
}

export default MPsuccess