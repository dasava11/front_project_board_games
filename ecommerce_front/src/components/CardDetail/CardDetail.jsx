import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../Redux/actions_creators/index';
import { useParams } from 'react-router-dom';
import style from '../CardDetail/CardDetail.module.css';
import Canasta from '../../Photos/Canasta.png';
import CorazonFav from '../../Photos/CorazonFav.png';

const CardDetail = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    console.log(game);
  }, [dispatch, id]);

  const availabilityClass = game.active ? style.availableGreen : style.availableRed;

  return (
    <div>
      <div className={style.containerGame}>
        <img className={style.imgDetail} src={game.image.url} alt="Game Image" />
      </div>

      <div className={style.containerGame2}>
        <h1 className={style.name}>{game.name}</h1>
        <p className={style.comment}>comment</p>
        <p className={style.available + ' ' + availabilityClass}>available</p>
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
        <div className={style.etc}>
          <p className={style.author}>Author</p>
          <p className={style.authors}>{game.Author.author_name}</p>
          <p className={style.nationality}>Nationality</p>
          <p className={style.nationalitys}>{game.Author.nationality}</p>
          <p className={style.bgg}>BGG</p>
          <p className={style.mechanic}>Mechanic</p>    
          <p className={style.mechanics}>{game.Mechanic.mechanic_name}</p>
          <p className={style.thematic} >Thematic</p>
          <p className={style.thematics}>{game.Thematic.thematic_name}</p>
          <p className={style.age}>Age</p>
          <p className={style.ages}>{game.age}</p>
          <p className={style.designer}>Designers</p>
          {game.Designers.map((designer) => (
          <p key={designer.designer_id} className={style.designers}>{designer.designer_name}</p>
        ))}
          <p className={style.editorial}>Editorial</p>
          <p className={style.editorials}>{game.Editorial.editorial_name}</p>
          <p className={style.weight}>Weight</p>
          <p className={style.weights}>{game.weight} g</p>
          <p className={style.language}>Language</p>
          {game.Languages.map((language) => (
          <p key={language.language_id} className={style.languages}>{language.language_name}</p>
        ))}
      </div>

      </div>
      <div className={style.imgMini}>
          
      </div>
      <div className={style.containerReview}>
        <p className={style.review}>Review</p>
        <input className={style.opinion} placeholder="leave your opinion..."></input>
      </div>


      <p>Released: {game.released}</p>
      <p>Stock: {game.stock}</p>
    </div>
  );
};

export default CardDetail;
