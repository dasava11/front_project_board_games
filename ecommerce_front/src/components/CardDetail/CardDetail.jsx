import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "../CardDetail/CardDetail.module.css";
import Canasta from "../../Photos/Canasta.png";
import CorazonFav from "../../Photos/CorazonFav.png";
import styles from './MoreInfo.module.css';

const CardDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(`https://backprojectboardgames-production.up.railway.app/games/id/${id}`);
        setGame(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGameDetail();
  }, [id]);

  if (!game) {
    return <p>Loading...</p>;
  }

  const onSaleClass = game.an_sale ? style.onSaleRed : style.onSaleGreen;

  return (
    <div key={game.name}>
      <div className={style.containerGame}>
        <img className={style.imgDetail} src={game.image.url} alt="Game Image" />
      </div>
      <div className={style.containerGame2}>
        <h1 className={style.name}>{game.name}</h1>
        <p className={style.comment}>comment</p>
        <p className={style.stock}>Stock: </p>
        <p className={style.stocks}>{game.stock}</p>
        <p className={style.onSale + " " + onSaleClass}>On sale</p>
        <p className={style.price}>$ {game.price} USD</p>

        <div>
          <button className={style.addToCart}>
            <img className={style.imgCanasta} src={Canasta} alt="Cart" />
            <p className={style.pAddToCart}>Add to cart</p>
          </button>

          <button className={style.buttomFav}>
            <img className={style.corazonFav} src={CorazonFav} alt="Favorite" />
          </button>
        </div>
      </div>
      <p className={style.description}>{game.Mechanic.description}</p>
      <div className={style.containerGame3}>
        <p className={style.categories}>Categories</p>
        {game.Categories.map((category) => (
          <p className={style.category} key={category.category_id}>{category.category_name}</p>
        ))}
        <h1 className={style.linea1}></h1>
        <p className={style.nJugadores}>N° jugadores</p>
        <p className={style.njugadoress}>{game.players_min} - {game.players_max}</p>
        <h1 className={style.linea2}></h1>
        <p className={style.timeGame}>Tiempo de juego</p>
        <p className={style.playingTime}>{game.playing_time} min x player</p>
      </div>
      <div className={style.containerGame4}>


        <div className={style.container}>
          <table className={styles.intercalatedTable}>
            <tbody>
                <tr className={styles.gris}>
                  <td>Author</td>
                  <t>{game.Author.author_name}</t>
                </tr>
                <tr className={styles.blanco}>
                  <td>Mechanic</td>
                  <td>{game.Mechanic.mechanic_name}</td>
                </tr>
                  <tr className={styles.gris}>
                    <td>Thematic</td>
                    <td>{game.Thematic.thematic_name}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{game.age}</td>
                  </tr>
                  <tr className={styles.gris}>
                    <td>Designers</td>
                    <td>{game.Designers[0].designer_name}</td>
                  </tr>
                  <tr>
                    <td>Editorial</td>
                    <td>{game.Editorial.editorial_name}</td>
                  </tr>
                  <tr className={styles.gris}>
                    <td>Weight</td>
                    <td>{game.weight}</td>
                  </tr>
                  <tr>
                    <td>Language</td>
                    <td>{game.Languages[0].language_name}</td>
                </tr>
              </tbody>
            </table>
</div>



      </div>
      <div className={style.containerReview}>
        <p className={style.review}>Review</p>
        <input className={style.opinion} placeholder="leave your opinion..." />
      </div>
    </div>
  );
};

export default CardDetail;
