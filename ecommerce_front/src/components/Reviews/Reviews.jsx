import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import style from "./Reviews.module.css";
// import { Rate } from "antd";

const VITE_URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

const Reviews = () => {
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://backprojectboardgames-production.up.railway.app/reviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  if (reviews) {
    console.log(reviews);
  } else {
    console.log("no reviews");
  }

  return <h1>Desde Review</h1>;
};

export default Reviews;
