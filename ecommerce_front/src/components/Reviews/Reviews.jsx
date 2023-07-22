import React, { useState, useEffect } from "react";
import style from "./Reviews.module.css";
import { Rate } from "antd";

const Reviews = () => {
  console.log("hola");

  return;
  // reviews ? (
  //   <div className={style.cardReviewDetail}>
  //     {reviews?.map((r) => {
  //       return (
  //         <div key={r.review_id} className={style.cardReviewItem}>
  //           <Rate disabled defaultValue={r.rating} />
  //           <h1>{r.comment}</h1>
  //         </div>
  //       );
  //     })}
  //   </div>
  // ) : (
  //   <h1>No reviews</h1>
  // );
};

export default Reviews;
