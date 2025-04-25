import React, { useState, useEffect } from "react";
import PrelimsCard from "./PrelimsCard";
import PrelimsPagination from "./PrelimsPagination";
import PrelimsSortDropdown from "./PrelimsSortDropdown";
import PrelimsCategoryDropdown from "./PrelimsCategoryDropdown";
import prelimsDummyData from "./PrelimsDummyData";
import { Spinner } from "react-bootstrap";
import "./PrelimsFeed.css";

const PrelimsFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(prelimsDummyData);
      setLoading(false);
    }, 500);
  }, []);

const handleVote = (questionId, optionIndex) => {
  const updatedData = data.map((item) => {
    if (item.id === questionId) {
      const updatedOptions = item.options.map((option, idx) =>
        idx === optionIndex ? { ...option, votes: option.votes + 1 } : option
      );
      return { ...item, options: updatedOptions };
    }
    return item;
  });
  setData(updatedData);
};


  const filteredData = data
    .filter((item) => !categoryFilter || item.category === categoryFilter)
    .sort((a, b) => {
      if (sort === "votes") return b.votes - a.votes;
      if (sort === "views") return b.views - a.views;
      return b.id - a.id; // Newest first (assuming higher id means newer)
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between mb-4">
        <PrelimsCategoryDropdown categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
        <PrelimsSortDropdown sort={sort} setSort={setSort} />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {paginatedData.length === 0 ? (
            <div className="text-center py-5">
              <h5>No questions available.</h5>
            </div>
          ) : (
            paginatedData.map((item) => (
 <PrelimsCard key={item.id} question={item} onVote={handleVote} />

            ))
          )}
          <PrelimsPagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default PrelimsFeed;
