import React, { useState, useEffect } from "react";
import style from "./Reviews.module.css";
import axios from "axios";

const VITE_URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

const Reviews = ({ gameId }) => {
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${VITE_URL_REVIEWS}/idGame/${gameId}`
        );
        setData(response.data);

        setReviews(data[0].Reviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data]);

  console.log(reviews);
  return (
    <div>
      {reviews.map((r) => {
        return (
          <div>
            <h1>{r.comment}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
