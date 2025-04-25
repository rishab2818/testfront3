import React from "react";
import { Dropdown } from "react-bootstrap";

const PrelimsSortDropdown = ({ sort, setSort }) => {
  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="rounded-3 shadow-sm"
      >
        Sort:{" "}
        {sort === "votes"
          ? "Most Voted"
          : sort === "views"
          ? "Most Viewed"
          : "Newest"}
      </Dropdown.Toggle>

      <Dropdown.Menu className="rounded-3 shadow-sm">
        <Dropdown.Item onClick={() => setSort("newest")}>Newest</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("votes")}>
          Most Voted
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("views")}>
          Most Viewed
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PrelimsSortDropdown;
