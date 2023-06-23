import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getAllGames} from '../../Redux/action-creators'
import Header from '../Header/Header'
import style from './Games.module.css'
import promotionalBanner from '../../Photos/PromotionalBanner.png'
import Filter from '../Filter/Filter'
import Card from '../Card/Card';

const Games = () => {
    const dispatch = useDispatch();
    let allGames = useSelector(state => state.allGames)

    useEffect(()=>{
        dispatch(getAllGames())
    },[])

    
  return (
    <div>
        <Header/>
        <div className={style.gamesBanner}>
            <img src={promotionalBanner} alt="Banner" />
        </div>
        <div className={style.gamesMain}>
            <div className={style.titleMain}>
                <h1>Board Games</h1>
                <h3>Choose your favorite game</h3>
            </div>
            <div className={style.filtersMain}>
                <Filter
                    type = {'categories'}
                    nameType={'category_name'}
                />
                <Filter
                    type = {'mechanics'}
                    nameType={'mechanic_name'}
                />
                <Filter
                    type = {'thematics'}
                    nameType={'thematic_name'}
                />
            </div>
        </div>
        <div className={style.gamesContainer}>
            {allGames && allGames.map(game =>{
                return (
                    <Card
                        name = {game.name}
                        image= {game.image}
                        price={game.price}
                        key={game.id}
                        id={game.game_id}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Games