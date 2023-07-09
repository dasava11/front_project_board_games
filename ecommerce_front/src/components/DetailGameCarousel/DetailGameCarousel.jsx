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

  return (
    <div className={styles.carouselDetail}>
      <button className={styles.carButnLft} value="back" onClick={handleClick}>
        {"<"}
      </button>
      <button className={styles.carButnRig} value="go" onClick={handleClick}>
        {">"}
        {/* <img src={arrowNext} alt="arrownext" onClick={handleClick} /> */}
      </button>
      <img src={carouselGame[index]} alt={`imagen ${[index]}`} />
    </div>
  );
};

export default DetailGameCarousel;
