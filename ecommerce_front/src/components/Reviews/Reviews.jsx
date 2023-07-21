import React, { useState } from "react";
import style from "./Reviews.module.css";
import { Rate } from "antd";

const Reviews = ({ data }) => {
  const reviews = [];
  data.map((item) => {
    item.Reviews.map((item2) => reviews.push(item2));
  });

  reviews.map((item) => console.log(item));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${VITE_URL_REVIEWS}/idGame/${gameId}`
        );
        setData(response.data);

        setReviews(data[0].Reviews);
      } catch (error) {
      }
    };
    fetchData();
  }, [data]);

  return (
    <div className={style.cardReviewDetail}>
      {reviews.map((r) => {
        return (
          <div key={r.review_id} className={style.cardReviewItem}>
            <Rate disabled defaultValue={r.rating} />
            <h1>{r.comment}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
