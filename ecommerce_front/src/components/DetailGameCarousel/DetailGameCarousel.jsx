import React, { useEffect, useState } from "react";
import arrowBack from "../../Photos/icons-back.png";
import arrowNext from "../../Photos/icons-next.png";
import styles from "../DetailGameCarousel/DetailGameCarousel.module.css";

const DetailGameCarousel = ({ game }) => {
  let carouselGame = game.image;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (index === carouselGame.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
      timerId = null;
    }, 3000);
    return () => clearTimeout(timerId);
  });

  const handleClick = (event) => {
    const { value } = event.target;
    let push = value;

    if (push === "go") {
      if (index === carouselGame.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }

    if (push === "back") {
      if (index === 0) {
        setIndex(carouselGame.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
  };

  const handleImage = (event) => {
    const { value } = event.target;
    console.log(value);
  };

  return (
    <div className={styles.carouselDetailGame}>
      <div className={styles.carouselDetail}>
        <button
          className={styles.carButnLft}
          value="back"
          onClick={handleClick}
        >
          {"<"}
          {/* {<img src={arrowBack} alt="arrownext" />} */}
        </button>
        <button className={styles.carButnRig} value="go" onClick={handleClick}>
          {">"}
          {/* {<img src={arrowNext} alt="arrownext" />} */}
        </button>
        <img
          className={styles.imageCorouselGame}
          src={carouselGame[index]}
          alt={`imagen ${[index]}`}
        />
      </div>
      <div className={styles.photoRoll}>
        {game.image.url ? (
          <img src={game.image.url} alt={game.name} />
        ) : (
          game.image.map((i, indexC) => {
            //console.log(indexC);
            return (
              <img
                className={styles.imgPhotoRoll}
                src={i}
                key={indexC}
                value={indexC}
                alt={`imagen ${[indexC]}`}
                onClick={(event) => handleImage(event)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default DetailGameCarousel;
