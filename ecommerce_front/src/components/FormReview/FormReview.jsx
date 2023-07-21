import React, { useState, useEffect } from "react";
import { StarOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import style from "./FormReview.module.css";
import axios from "axios";

const VITE_URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

const FormReview = ({ gameId }) => {
  const [stars, setStars] = useState(1);
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const handleStars = (e) => {
    setStars(e);
    console.log(stars);
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewObj = {
      rating: stars,
      comment: message,
      user_id: userId,
      game_id: gameId,
    };
    console.log(gameId);
    console.log(reviewObj);
    try {
      axios.post(VITE_URL_REVIEWS, reviewObj);
    } catch (error) {
      console.log(error.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={style.formReview}>
      <Rate onChange={handleStars} />
      <textarea onChange={handleOnChange}></textarea>
      <button type="submit">send</button>
    </form>
  );
};

export default FormReview;
