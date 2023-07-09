import React, { useEffect, useState } from "react";
import arrowBack from "../../Photos/arrowBack96.png";
import arrowNext from "../../Photos/arrowNext96.png";
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

  return (
    <div className={styles.carouselDetail}>
      <button className={styles.carButnLft}>
        <img
          src={arrowNext}
          alt="arrowBack"
          value="back"
          onClick={handleClick}
        />
      </button>
      <button className={styles.carButnRig}>
        <img src={arrowBack} alt="arroNext" value="go" onClick={handleClick} />
      </button>
      <img src={carouselGame[index]} alt={`imagen ${[index]}`} />
    </div>
  );
};

export default DetailGameCarousel;
