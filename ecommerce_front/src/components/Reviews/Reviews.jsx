import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Reviews.module.css";
import { Rate } from "antd";

const VITE_URL_REVIEWS = import.meta.env.VITE_URL_REVIEWS;

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${VITE_URL_REVIEWS}/idGame/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [id]);

  console.log(reviews);

  return <h1>Desde Review</h1>;
};

export default Reviews;
