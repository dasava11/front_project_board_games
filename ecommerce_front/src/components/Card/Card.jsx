import React, { useState } from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { name, image, price, id, onSale } = props;
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = (e) => {
    console.log(e.target.value);

    if (isFav === true) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  };
  return (
    <div className={style.card}>
      <Link to={`/details/${id}`}>
        <div className={style.imgContainer}>
          <img
            src={
              image.length === 0
                ? "https://res.cloudinary.com/dwqp5iaqw/image/upload/v1689282470/boduDefaultImg_n0nim4.jpg"
                : image[0]
            }
            alt={name}
          />
        </div>
      </Link>
      <h1>{name}</h1>
      <h2 className={onSale === true ? style.priceSale : style.priceFull}>
        ${price} USD
      </h2>
      {onSale === true ? <h2>${(price * 0.8).toFixed(2)} USD</h2> : null}
      <div className={onSale === true ? style.cardInfo : ""}>
        {onSale === true ? <span className={style.cardSale}>sale</span> : ""}
        {isFav ? (
          <p className={style.icon} onClick={handleFavorite}>
            ❤️
          </p>
        ) : (
          <p className={style.icon} onClick={handleFavorite}>
            🤍
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
