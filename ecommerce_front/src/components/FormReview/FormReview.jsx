import React, { useState, useEffect } from "react";
import { StarOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import style from "./FormReview.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const VITE_URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

const FormReview = ({ gameId, handleModal }) => {
  const [stars, setStars] = useState(1);
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState(null);

  console.log(stars);

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

    if (message === null) {
      return;
    } else {
      const reviewObj = {
        rating: stars,
        comment: message,
        user_id: userId,
        game_id: gameId,
      };
      try {
        toast.success("We received your review!");
        axios.post(VITE_URL_REVIEWS, reviewObj);
      } catch (error) {
        toast.error("Review not send, try again");
        console.log(error.data.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className={style.formReview}>
      <Rate onChange={handleStars} />
      <textarea onChange={handleOnChange}></textarea>
      <button
        disabled={message === null ? true : false}
        type="submit"
        onClick={handleModal}
      >
        send
      </button>
    </form>
  );
};

export default FormReview;
