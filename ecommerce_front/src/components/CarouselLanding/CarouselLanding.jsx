import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { img1, img2, img3, img4, img5 } from "./images";
import arrowBack from "../../Photos/iconBack.svg";
import arrowGo from "../../Photos/iconNext.svg";
import styles from "./CarouselLanding.module.css";

const CarouselLanding = () => {
  const carousel = [img1, img2, img3, img4, img5];

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (index === carousel.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
      timerId = null;
    }, 8000);
    return () => clearTimeout(timerId);
  });

  const handleClick = (event) => {
    const { alt } = event.target;
    let push = alt;

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
      <button className={styles.carouselBtnLft}>
        <img src={arrowBack} alt="back" onClick={handleClick} />
      </button>
      <button className={styles.carouselBtnRig}>
        <img src={arrowGo} alt="go" onClick={handleClick} />
      </button>
      <img
        className={styles.carouselBanner}
        src={carousel[index]}
        alt={`imagen ${[index]}`}
        onClick={() => navigate("/games")}
      />
    </div>
  );
};

export default CarouselLanding;
