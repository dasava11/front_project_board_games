import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { searchFaqData } from '../../store/faq/faqActions';
import { searchFaqData } from '../../Redux/actions_creators/index';

const SearchBarFaq = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(searchFaqData(term));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search FAQs"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBarFaq;
