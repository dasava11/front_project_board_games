import React, { useState, useEffect } from "react";
import style from "./Reviews.module.css";
import { Rate } from "antd";

const Reviews = ({ reviews }) => {
  const [reviews2, setReviews2] = useState([]);

  const fetchData = async () => {
    const reviews21 = await reviews;

    setReviews2(reviews21);
  };

  fetchData();
  return (
    reviews2 && (
      <div className={style.cardReviewDetail}>
        {reviews2?.map((r) => {
          return (
            <div key={r.review_id} className={style.cardReviewItem}>
              <Rate disabled defaultValue={r.rating} />
              <h1>{r.comment}</h1>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Reviews;
