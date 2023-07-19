import React, { useState } from "react";
import AccordionFaq from "./AccordionFAQ/AccordionFaq";
import style from "./Faq.module.css";
import { useSelector } from "react-redux";

const FAQ = () => {
  const questions = [
    {
      question: "How many players can participate?",
      answer: "Our games are designed for 2-6 players.",
    },
    {
      question: "Are the games suitable for children?",
      answer:
        "Yes, our games are family-friendly and suitable for children ages 8 and up.",
    },
    {
      question: "How long does a typical game session last?",
      answer:
        "The duration of a game session varies, but most games can be completed in 1-2 hours.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship our games worldwide. Shipping fees may apply.",
    },
    {
      question: "Can I return a game if I am not satisfied?",
      answer:
        "We offer a 30-day return policy. Please refer to our refund policy for more information.",
    },
  ];

  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={darkMode === true ? style.darkFaq : style.faq}>
      <h2>frequent asked questions</h2>
      {questions.map((quest, index) => {
        return (
          <AccordionFaq
            question={quest.question}
            answer={quest.answer}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default FAQ;
