import React, { useState, useEffect } from "react";
import { img1, img2, img3 } from "./images";
import styles from "./CarouselLanding.module.css";

const CarouselLanding = () => {
  const carousel = [img1, img2, img3];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (index === carousel.length - 1) {
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
      if (index === carousel.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }

    if (push === "back") {
      if (index === 0) {
        setIndex(carousel.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <button
        className={styles.carouselBtnLft}
        value="back"
        onClick={handleClick}
      >
        {"<"}
      </button>
      <button
        className={styles.carouselBtnRig}
        value="go"
        onClick={handleClick}
      >
        {">"}
      </button>
      <img src={carousel[index]} alt={`imagen ${[index]}`} />
    </div>
  );
};

export default CarouselLanding;
