import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../Redux/actions_creators";
import style from "./SaleGames.module.css";
import Card from "../Card/Card";
import salesBanner from "../../Photos/salesBanner.jpeg";

const SaleGames = () => {
  const dispatch = useDispatch();
  let allGames = useSelector((state) => state.allGames);
  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  const currentSale = allGames.filter((game) => game.on_sale === true);

  return (
    <div className={style.Grid}>
      <img className={style.imgSale} src={salesBanner} alt="offer" />
      <div
        className={darkMode === true ? style.darkSalesTitle : style.salesTitle}
      >
        <h1>Games on Sale</h1>
        <h3>Take advantage of the discounts</h3>
      </div>
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
                onSale={game.on_sale}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SaleGames;
