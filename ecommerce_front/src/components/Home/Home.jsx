import React from "react";
import CarouselLanding from "../CarouselLanding/CarouselLanding";
import SaleGames from "../SalesGames/SaleGames";
import style from "./Home.module.css";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Outlet />
      <CarouselLanding />
      <hr className={style.divisor} />
      <SaleGames />
    </div>
  );
};

export default Home;
