import React from "react";
import CarouselLanding from "../CarouselLanding/CarouselLanding";
import SaleGames from "../SalesGames/SaleGames";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <CarouselLanding />
      <hr className={style.divisor} />
      <SaleGames />
    </div>
  );
};

export default Home;
