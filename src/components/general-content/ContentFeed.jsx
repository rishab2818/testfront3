import React, { useState, useEffect, useContext } from "react";
import SubjectDropdown from "./SubjectDropdown";
import SortDropdown from "./SortDropdown";
import ContentCard from "./ContentCard";
import PaginationComp from "./PaginationComp";
import { Spinner } from "react-bootstrap";
import "./ContentFeed.css"; // fade-in animation
import { fetchQnA } from "../../APIs/fetchQnA";
import AuthContext from "../../context/AuthContext";
const ContentFeed = ({ page, src, userId }) => {
  const [subjectFilter, setSubjectFilter] = useState("");
  const [sort, setSort] = useState("unanswered");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const itemsPerPage = 5;

  useEffect(() => {
    // const userId = user._id;
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchQnA(subjectFilter, sort, page, src, userId);
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [subjectFilter, sort, page, src]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <SubjectDropdown
          subjectFilter={subjectFilter}
          setSubjectFilter={setSubjectFilter}
        />
        {src !== 1 && src !== 2 && (
          <SortDropdown sort={sort} setSort={setSort} />
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {paginatedData.length === 0 ? (
            <div className="text-center py-5">
              <h5>No content found.</h5>
            </div>
          ) : (
            paginatedData.map((item, idx) => (
              <ContentCard
                key={idx}
                question={item.question}
                answer={item.answers}
                user={user}
              />
            ))
          )}
          <PaginationComp
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ContentFeed;
