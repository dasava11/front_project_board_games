import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "../CardDetail/CardDetail.module.css";
import cart from "../../Photos/plusCart.svg"
import heart from "../../Photos/heart.svg"
import MoreDetail from "../MoreDetail/MoreDetail";
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'


const CardDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true)
  const [moreInfo, setMoreInfo] = useState(false)

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(`https://backprojectboardgames-production.up.railway.app/games/id/${id}`);
        setGame(response.data);


        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchGameDetail();
  }, [id]);

  const handlerBtn = () => {
    if(moreInfo){
      setMoreInfo(false)
    }else{
      setMoreInfo(true)
    }
  }


  return ( loading ? <h1>Cargando...</h1> :
    <div>
      <div className={style.firstFlexCd}>
        <div className={style.imgCardDetail}>
          <img src={game.image.url} alt={game.name} />
        </div>
        <div className={style.inforCardDeatail}>
          <h1>{game.name}</h1>
          <div className={style.ratingCd}>
            <h3>Rating</h3>
            {game.active ? <h3 className={style.availableCd}>available</h3> : <h3 className={style.unavailableCd}>unavailable</h3>}
          </div>
          <h2>${game.price} USD</h2>
          <div className={style.cardDBtns}>
            <button className={style.cartBtn}>add to cart<span><img src={cart} alt="cart" /></span></button>
            <button className={style.heartBtn}><img src={heart} alt="heart" /></button>
          </div>
          <div className={style.cardDescription}>
            <p>{game.Mechanic.description}</p>
          </div>
          <div className={style.characteristics}>
            <div className={style.categoryCd}>
              <h2>category</h2>
              {game && game.Categories.map((category, index) =>{
                return <h3 key={index}>{category.category_name}</h3>
              })}
            </div>
            <hr />
            <div className={style.playersCd}>
              <h2>number of players</h2>
              <h3>{game.players_min} <span></span> {game.players_max}</h3>
            </div>
            <hr />
            <div className={style.timeCd}>
              <h2>time to play</h2>
              <h3>{game.playing_time} min per player</h3>
            </div>
          </div>
          <button 
            className={style.seeMoreBtn}
            onClick={handlerBtn}
          >{moreInfo ? <div>less info<ChevronUpIcon/></div> : <div>more info<ChevronDownIcon/></div>}</button>
          {moreInfo && 
          <MoreDetail
            game = {game}
          />}
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
  )
};

export default CardDetail;
