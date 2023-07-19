import React from "react";
import style from "./Pagination.module.css";
import { useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = (props) => {
  const { setCurrentPage, totalPosts, postPerPage, currentPage } = props;
  const darkMode = useSelector((state) => state.darkMode);

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div
      className={darkMode === true ? style.darkPagination : style.pagination}
    >
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 ? true : false}
        className={currentPage === 1 ? style.disabled : style.active}
      >
        <ChevronLeftIcon />
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? style.disabled : style.active}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages.length ? true : false}
        className={currentPage === pages.length ? style.disabled : style.active}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
