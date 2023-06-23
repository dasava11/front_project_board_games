import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../Redux/action-creators';
import { useParams } from 'react-router-dom';

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
      <h1>Id: {game.game_id}</h1>
      <h2>Title: {game.name}</h2>
      <p>Released: {game.released}</p>
      <p>Price: {game.price}</p>
      <p>Age: {game.age}</p>
      <p>Min Players: {game.players_min}</p>
      <p>Max Players: {game.players_max}</p>
      <p>Stock: {game.stock}</p>
      <p>Active: {game.active ? 'Yes' : 'No'}</p>
      <p>Weight: {game.weight}</p>
      <p>Playing Time: {game.playing_time}</p>
      <p>Thematic ID: {game.ThematicThematicId}</p>
      <p>Mechanic ID: {game.MechanicMechanicId}</p>
      <p>Editorial ID: {game.EditorialIdEditorial}</p>
      <p>Author ID: {game.AuthorAuthorId}</p>
    </div>
  );
};

export default CardDetail;
