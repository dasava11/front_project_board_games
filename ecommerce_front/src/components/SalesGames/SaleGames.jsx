import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../Redux/actions_creators";
import style from "./SaleGames.module.css";
import Card from "../Card/Card";

const SaleGames = () => {
  const dispatch = useDispatch();
  let allGames = useSelector((state) => state.allGames);

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  const currentSale = allGames.filter((game) => game.on_sale === true);

  console.log(allGames);
  return (
    <div className={style.Grid}>
      <img
        className={style.imgSale}
        src="https://marketplace.canva.com/EAE6uxzge6c/1/0/1600w/canva-yellow-and-white-minimalist-big-sale-banner-BjBIq-T_6j4.jpg"
        alt="offer"
      />
      <div className={style.saleGames}>
        {allGames &&
          currentSale.map((game) => {
            return (
              <Card
                name={game.name}
                image={game.image}
                price={game.price}
                key={game.game_id}
                id={game.game_id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SaleGames;
