import React, { useState, useEffect } from "react";
import style from "./Reviews.module.css";
import { Rate } from "antd";

const Reviews = ({ data }) => {
  const reviews = [];
  data.map((item) => {
    item.Reviews.map((item2) => reviews.push(item2));
  });

  return (
    Reviews && (
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
    )
  );
};

export default Reviews;
