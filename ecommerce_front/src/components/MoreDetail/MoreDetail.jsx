import React from 'react'
import style from './MoreDetail.module.css'


const MoreDetail = (props) => {
    const {game} = props
  return (
    <div className={style.moreInfoDetail}>
        <div className={style.moreInfoRow}>
            <h2>Author:</h2>
            <h3>{game && game.Author.author_name}</h3>
        </div>
        <div className={style.moreInfoRow}>
            <h2>Mechanics:</h2>
            <h3>{game && game.Mechanic.mechanic_name}</h3>
        </div>
        <div className={style.moreInfoRow}>
            <h2>Themantics:</h2>
            <h3>{game && game.Thematic.thematic_name}</h3>
        </div>
        <div className={style.moreInfoRow}>
            <h2>Age:</h2>
            <h3>{game && game.age}</h3>
        </div>
        <div className={style.moreInfoRow}>
            <h2>Weight:</h2>
            <h3>{game && game.weight} lb</h3>
        </div>
    </div>
  )
}

export default MoreDetail