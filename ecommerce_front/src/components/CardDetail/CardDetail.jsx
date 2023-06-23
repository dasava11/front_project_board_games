import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { getDetail } from "../../Redux/actions_creators";

const CardDetail = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);
  const { id } = useParams();

  useEffect(() => {
    console.log(game);
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <Header />
      <h1>Id: {game[0].game_id}</h1>
      <h2>Title: {game[0].name}</h2>
      <p>Released: {game[0].released}</p>
      <p>Price: {game[0].price}</p>
      <p>Age: {game[0].age}</p>
      <p>Min Players: {game[0].players_min}</p>
      <p>Max Players: {game[0].players_max}</p>
      <p>Stock: {game[0].stock}</p>
      <p>Active: {game[0].active ? "Yes" : "No"}</p>
      <p>Weight: {game[0].weight}</p>
      <p>Playing Time: {game[0].playing_time}</p>
      <p>Thematic ID: {game[0].ThematicThematicId}</p>
      <p>Mechanic ID: {game[0].MechanicMechanicId}</p>
      <p>Editorial ID: {game[0].EditorialIdEditorial}</p>
      <p>Author ID: {game[0].AuthorAuthorId}</p>
    </div>
  );
};

export default CardDetail;
