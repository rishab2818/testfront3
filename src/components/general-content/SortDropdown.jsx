import React from "react";
import { Dropdown } from "react-bootstrap";

const SortDropdown = ({ sort, setSort }) => {
  const getSortLabel = (sort) => {
    switch (sort) {
      case "unanswered":
        return "Unanswered";
      case "popularUnanswered":
        return "Popular Unanswered";
      case "newlyAnswered":
        return "Newly Answered";
      case "trending":
        return "Trending";
      case "engaging":
        return "Engaging";
      default:
        return "unanswered"; // default
    }
  };

  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="rounded-3 shadow-sm"
      >
        Sort: {getSortLabel(sort)}
      </Dropdown.Toggle>

      <Dropdown.Menu className="rounded-3 shadow-sm">
        <Dropdown.Item onClick={() => setSort("unanswered")}>
          Unanswered
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("popularUnanswered")}>
          Popular Unanswered
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("newlyAnswered")}>
          Newly Answered
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("trending")}>
          Trending
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("engaging")}>
          Engaging
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
