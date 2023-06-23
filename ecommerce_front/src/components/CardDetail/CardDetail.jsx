import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../Redux/actions_creators/index'
import { useParams } from 'react-router-dom';
import style from '../CardDetail/CardDetail.module.css'
import Canasta from '../../Photos/Canasta.png'
import CorazonFav from '../../Photos/CorazonFav.png'

const CardDetail = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);
  const { id } = useParams();

  useEffect(() => {
    console.log(game)
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>

        <div className={style.containerGame}>
            <img className={style.imgDetail} src={game[0].image.url}/>
        </div>

        <div className={style.containerGame2}>
          <h1 className={style.name}>{game[0].name}</h1>
          <p className={style.comment}>comment</p>
          <p className={style.price}>$ {game[0].price} USD</p>

          <div>
            <button className={style.addToCart}>
                <img className={style.imgCanasta}src={Canasta}/>
                <p className={style.pAddToCart}>Add to cart</p>
            </button>

            <button className={style.buttomFav}>
                <img className={style.corazonFav} src={CorazonFav}/>
            </button>
          </div>

        </div>





        <p>Released: {game[0].released}</p>
      <p>Age: {game.age}</p>
      <p>Min Players: {game.players_min}</p>
      <p>Max Players: {game[0].players_max}</p>
      <p>Stock: {game[0].stock}</p>
      <p>Active: {game[0].active ? 'Yes' : 'No'}</p>
      <p>Weight: {game[0].weight}</p>
      <p>Playing Time: {game[0].playing_time}</p>
      <p>Author: {game[0].Author.author_name}</p>
      <p>Categories: {game[0].Categories[0].category_name}</p>
      <p>Designers: {game[0].Designers[0].designer_name}</p>
      <p>Editorial: {game[0].Editorial.editorial_name}</p>
      <p>Lenguages: {game[0].Languages[0].languages_name}</p>
      <p>Mechanic: {game[0].Mechanic.mechanic_name}</p>
    </div>
  );
};

export default CardDetail;
