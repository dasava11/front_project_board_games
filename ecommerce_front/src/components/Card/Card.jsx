import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { name, image, price, id, onSale } = props;

  return (
    <Link to={`/details/${id}`} className={style.card}>
      <div className={style.imgContainer}>
        <img src={image.url ? image.url : image[0]} alt={name} />
      </div>
      <h1>{name}</h1>
      <h2>${price} USD</h2>
      <div className={onSale === true ? style.cardInfo : ""}>
        {onSale === true ? <span className={style.cardSale}>sale</span> : ""}
        <p>free shipping</p>
      </div>
    </Link>
  );
};

export default Card;
