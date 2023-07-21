// import { fetchFaqData } from '../../Redux/actions_creators/index';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FaqList from './FaqList';
import SearchBarFaq from './SearchBarFaq';
// import { fetchFaqData } from '../../store/faq/faqActions';
import { fetchFaqData } from '../../Redux/actions_creators/index';
import './faq.css';

const Faq = () => {
  const dispatch = useDispatch();
  //  const faqData = useSelector((state) => state.faq);

  const loading = useSelector((state) => state.loading);
  const faqItems = useSelector((state) => state.faqItems);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchFaqData());
  }, [dispatch]);

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <SearchBarFaq />
      {loading ? (
        <p className="faq-loading">Loading...</p>
      ) : error ? (
        <p className="faq-error">Error: {error}</p>
      ) : (
        <FaqList faqItems={faqItems} />
      )}
    </div>
  );
};

export default Faq;
