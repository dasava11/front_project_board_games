import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "../CardDetail/CardDetail.module.css";
import Canasta from "../../Photos/Canasta.png";
import CorazonFav from "../../Photos/CorazonFav.png";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'

const CardDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(`https://backprojectboardgames-production.up.railway.app/games/id/${id}`);
        setGame(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGameDetail();
  }, [id]);

  if (!game) {
    return <p>Loading...</p>;
  }

  const availabilityClass = game.active ? style.availableGreen : style.availableRed;

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
        <p className={style.available + " " + availabilityClass}>available</p>
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
        <p className={style.moreInfo}>More info</p>
        <TableContainer>
  <Table variant='simple'>
    <Tbody>
      <Tr>
        <Td>Author</Td>
        <Td>game.Author.author_name</Td>
      </Tr>
      <Tr>
        <Td>Nationality</Td>
        <Td>game.Author.nationality</Td>
      </Tr>
      <Tr>
        <Td>Mechanic</Td>
        <Td>game.Mechanic.mechanic_name</Td>
      </Tr>
      <Tr>
        <Td>Thematic</Td>
        <Td>game.Thematic.thematic_name</Td>
      </Tr>
      <Tr>
        <Td>Age</Td>
        <Td>game.age</Td>
      </Tr>
      <Tr>
        <Td>Designers</Td>
        <Td>designers</Td>
      </Tr>
      <Tr>
        <Td>Editorial</Td>
        <Td>game.Editorial.editorial_name</Td>
      </Tr>
      <Tr>
        <Td>Weight</Td>
        <Td>game.weight</Td>
      </Tr>
      <Tr>
        <Td>Language</Td>
        <Td>laguage</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
      </div>
      <div className={style.containerReview}>
        <p className={style.review}>Review</p>
        <input className={style.opinion} placeholder="leave your opinion..." />
      </div>
    </div>
  );
};

export default CardDetail;
