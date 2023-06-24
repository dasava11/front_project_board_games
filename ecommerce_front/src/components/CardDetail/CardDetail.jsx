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

  return (
    <div>
      <div className={style.containerGame}>
        <img className={style.imgDetail} src={game.image.url} alt="Game Image" />
      </div>

      <div className={style.containerGame2}>
        <h1 className={style.name}>{game.name}</h1>
        <p className={style.comment}>comment</p>
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
      <p className={style.moreInfo}>More info</p>
      <div className={style.etc}>
          <h1>Autores, diseñadores y demás</h1>
      </div>
      <div className={style.imgMini}>
          <h1>Aquí van las img pequeñas</h1>
      </div>
      <div className={style.containerReview}>
        <p className={style.review}>Review</p>
        <input className={style.opinion} placeholder="leave your opinion..."></input>
      </div>


      <p>Released: {game.released}</p>
      <p>Age: {game.age}</p>
      <p>Stock: {game.stock}</p>
      <p>Active: {game.active ? 'Yes' : 'No'}</p>
      <p>Weight: {game.weight}</p>

      <p>Author: {game.Author.author_name}</p>
      <p>Nationality: {game.Author.nationality}</p>
      
      <p>Editorial: {game.Editorial.editorial_name}</p>
      
      <p>Mechanic: {game.Mechanic.mechanic_name}</p>
      

      <p>Thematic: {game.Thematic.thematic_name}</p>
      

      {game.Designers.map((designer) => (
        <p key={designer.designer_id}>Designers: {designer.designer_name}</p>
      ))}
      

      <p>Languages:{game.Languages.map((language) => (
        <p key={language.language_id}>{language.language_name}</p>
      ))}</p>
      
    </div>
  );
};

export default CardDetail;
