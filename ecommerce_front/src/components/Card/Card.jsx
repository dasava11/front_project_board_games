import React, { useState, useEffect } from "react";
import { getUserById, getAllUsers } from "../../Redux/actions_creators/index";
import { useAuth } from "../Auth/authContext";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { auth } from "../Auth/firebase";
import { toast } from "react-toastify";
const VITE_URL_USERS = import.meta.env.VITE_URL_USERS;

const Card = (props) => {
  const { name, image, price, id, onSale } = props;
  const [isFav, setIsFav] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const { userAuth } = useAuth();
  const [fav, setFav] = useState();

  useEffect(() => {
    const userIdAux = localStorage.getItem("user_id");
    axios
      .get(`${VITE_URL_USERS}/${userIdAux}`)
      .then((res) => setFav(res.data.wish_list))
      .then(() =>
        setIsFav(fav.some((g) => parseInt(g.game_id) === parseInt(id)))
      );
    console.log(fav);
  }, [fav]);

  const handleFavorite = async (res) => {
    try {
      const data = { user_id: userAuth.uid, game_id: id };
      let response = await axios.put(
        "https://backprojectboardgames-production.up.railway.app/users/wishlist",
        data
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
    if (isFav === true) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  };

  return (
    <div className={darkMode === true ? style.darkCard : style.card}>
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
