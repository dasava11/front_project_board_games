import { createElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "../CardDetail/CardDetail.module.css";
import heart from "../../Photos/heart.svg";
import shoppingCart from "../../Photos/plusCart.svg";
import star from "../../Photos/star.png";
import MoreDetail from "../MoreDetail/MoreDetail";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import useLocalStorage from "../LocalStorage/useLocalStorage";
import { toast } from "react-toastify";

const VITE_URL_ALL_GAMES = import.meta.env.VITE_URL_ALL_GAMES;

const CardDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);
  const [cart, setCart] = useLocalStorage("cart", []);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(
          `https://backprojectboardgames-production.up.railway.app/games/id/${id}`
        );
        setGame(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameDetail();
  }, [id]);

  /*   const handlerBtn = () => {
    if (moreInfo) {
      setMoreInfo(false);
    } else {
      setMoreInfo(true);
    }
  }; */

  const handleCart = () => {
    let duplicate = cart?.find((g) => g.game_id === game.game_id);

    if (duplicate) {
      for (let index = 0; index < cart.length; index++) {
        let g = cart[index];
        if (g.game_id === game.game_id) {
          if (g.count < g.stock) {
            g.count = g.count + 1;
            g.total_price = g.count * g.price;
            setCart([...cart]);
            toast.success(`${game.name} added to cart`);
          } else if (g.count >= g.stock) {
            toast.error(`${game.name} exceeds stock`);
          }
        }
      }
    } else {
      game.count = +1;
      game.total_price = game.price;
      setCart([...cart, game]);
      toast.success(`${game.name} added to cart`);
    }
  };

  return loading ? (
    <h1>Cargando...</h1>
  ) : (
    <div>
      <div className={style.firstFlexCd}>
        <div className={style.imgCardDetail}>
          <img
            src={game.image.url ? game.image.url : game.image[0]}
            alt={game.name}
          />
        </div>
        <div className={style.gameDetail}>
          <div className={style.inforCardDetail}>
            <div className={style.titleGame}>
              <h1 className={style.nameGame}>{game.name}</h1>
              {game.stock === 0 ? (
                <h3 className={style.unavailableCd}>unavailable</h3>
              ) : (
                <h3 className={style.availableCd}>available</h3>
              )}
            </div>
            <div className={style.ratingCd}>
              <span>
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
                <img className={style.starRating} src={star} alt="star" />
              </span>
            </div>
            <h2 className={style.priceGame}>${game.price} USD</h2>
            <div className={style.cardDBtns}>
              <button className={style.cartBtn} onClick={handleCart}>
                add to cart
                <span>
                  <img src={shoppingCart} alt="cart" />
                </span>
              </button>
              <button className={style.heartBtn}>
                <img className={style.heartImg} src={heart} alt="heart" />
              </button>
            </div>
            <div className={style.cardDescription}>
              <p>{game.Mechanic.description}</p>
            </div>
            <div className={style.characteristics}>
              <div className={style.categoryCd}>
                <h2>category</h2>
                {game &&
                  game.Categories.map((category, index) => {
                    return <h3 key={index}>{category.category_name}</h3>;
                  })}
              </div>
              <hr />
              <div className={style.playersCd}>
                <h2>number of players</h2>
                <h3>
                  {game.players_min} <span></span> {game.players_max}
                </h3>
              </div>
              <hr />
              <div className={style.timeCd}>
                <h2>time to play</h2>
                <h3>{game.playing_time} min per player</h3>
              </div>
            </div>
          </div>
          <MoreDetail game={game} />
        </div>
      </div>
      <div className={style.reviewCardDetail}>
        <h1>Review</h1>
        <div className={style.textAreaDetail}>
          <textarea cols="30" rows="5"></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
