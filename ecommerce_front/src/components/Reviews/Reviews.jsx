import React, { useState, useEffect } from "react";
import style from "./Reviews.module.css";
import { Rate } from "antd";

const Reviews = ({ reviews }) => {
  const [reviews2, setReviews2] = useState([]);

  setTimeout(() => {
    console.log(reviews);
  }, 2000);

  return reviews2 ? (
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
  ) : (
    <h1>No reviews</h1>
  );
};

export default Reviews;
