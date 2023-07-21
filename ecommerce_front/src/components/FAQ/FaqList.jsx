import React from 'react';
import FaqItem from './FaqItem';
import './faq.css';

const FaqList = ({ faqItems }) => {
  return (
    <div>
      {faqItems.map((faqItem) => (
        <FaqItem
          key={faqItem.id} // Asigna una clave única utilizando faqItem.id u otra propiedad única
          question={faqItem.question}
          answer={faqItem.answer}
        />
      ))}
    </div>
  );
};

export default FaqList;
