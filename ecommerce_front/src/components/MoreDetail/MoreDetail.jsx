import React from "react";
import style from "./MoreDetail.module.css";

const MoreDetail = (props) => {
  const { game } = props;
  return (
    <div className={style.moreInfoDetail}>
      <div className={style.moreInfoRow}>
        <h2>
          Author: <span>{game && game.Author.author_name}</span>
        </h2>
      </div>
      <hr className={style.divisorInfo} />
      <div className={style.moreInfoRow}>
        <h2>
          Designers:
          <span>
            {game &&
              game.Designers.map((d) => {
                return <span> - {d.designer_name}</span>;
              })}
          </span>
        </h2>
      </div>
      <hr className={style.divisorInfo} />
      <div className={style.moreInfoRow}>
        <h2>
          Mechanics: <span>{game && game.Mechanic.mechanic_name}</span>
        </h2>
      </div>
      <hr className={style.divisorInfo} />
      <div className={style.moreInfoRow}>
        <h2>
          Themantics: <span>{game && game.Thematic.thematic_name}</span>
        </h2>
      </div>
      <hr className={style.divisorInfo} />
      <div className={style.moreInfoRow}>
        <h2>
          Age: <span>{game && game.age}</span>
        </h2>
      </div>
      <hr className={style.divisorInfo} />
      <div className={style.moreInfoRow}>
        <h2>
          Difficulty: <span>{game && game.weight}</span>
        </h2>
      </div>
      <hr className={style.divisorInfo} />
      <div className={style.moreInfoRow}>
        <h2>
          Editorial: <span>{game && game.Editorial.editorial_name}</span>
        </h2>
      </div>
      <hr className={style.divisorInfo} />
      <div className={style.moreInfoRow}>
        <h2>
          Languages:{" "}
          <span>
            {game &&
              game.Languages.map((l) => {
                return <span> - {l.language_name}</span>;
              })}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default MoreDetail;
