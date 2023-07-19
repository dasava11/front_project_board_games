import React, { useEffect, useState } from "react";
import arrowBack from "../../Photos/icons-back.png";
import arrowNext from "../../Photos/icons-next.png";
import styles from "../DetailGameCarousel/DetailGameCarousel.module.css";
import { useSelector } from "react-redux";

const DetailGameCarousel = ({ game }) => {
  let carouselGame = game.image;

  const [index, setIndex] = useState(0);
  const darkMode = useSelector((state) => state.darkMode);

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
    let push = event.target.alt;

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
    const { alt } = event.target;
    setIndex(Number(alt));
  };

  return (
    <div className={styles.carouselDetailGame}>
      <div className={styles.carouselDetail}>
        <button className={styles.carButnLft}>
          <img src={arrowBack} alt="back" onClick={handleClick} />
        </button>
        <button className={styles.carButnRig}>
          <img src={arrowNext} alt="go" onClick={handleClick} />
        </button>
        <img
          className={styles.imageCorouselGame}
          src={carouselGame[index]}
          alt={`imagen ${[index]}`}
        />
      </div>
      <div
        className={darkMode === true ? styles.darkPhotoRoll : styles.photoRoll}
      >
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
                alt={indexC}
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
