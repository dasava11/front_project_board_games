import React from 'react'
import style from './Card.module.css'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const {name, image, price, id} = props

  return (
    <Link to={`/details/${id}`} className={style.card}>
        <div className={style.imgContainer}>
            <img src={image.url} alt={name}/>
        </div>
        <h1>{name}</h1>
        <h2>{price}</h2>
        <p>free shipping</p>
    </Link>
  )
}

export default Card