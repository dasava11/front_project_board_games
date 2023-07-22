import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import style from "./Reviews.module.css";
import { Rate } from "antd";

const VITE_URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState();

  console.log(id);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://backprojectboardgames-production.up.railway.app/reviews/idGame/${id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  return reviews ? (
    <div>
      {reviews.map((item) => {
        <div>
          <Rate disabled defaultValue={item.rate} />
          <p>{item.comment}</p>
        </div>;
      })}
    </div>
  ) : (
    <h1>No hay reviews</h1>
  );
};

export default Reviews;
