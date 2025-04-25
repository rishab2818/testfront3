import React from "react";
import { Pagination } from "react-bootstrap";

const PrelimsPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="justify-content-center mt-4">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
          className="rounded-5 px-3"
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PrelimsPagination;