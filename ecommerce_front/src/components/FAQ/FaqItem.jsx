import React from 'react';
import './faq.css';

const FaqItem = ({ key, question, answer }) => {
  return (
    <div key={key} className="faq-item">
      <h3 className="faq-question">{question}</h3>
      <p className="faq-answer">{answer}</p>
    </div>
  );
};

export default FaqItem;
