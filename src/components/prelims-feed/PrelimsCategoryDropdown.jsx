import React from "react";
import { Dropdown } from "react-bootstrap";

const PrelimsCategoryDropdown = ({ categoryFilter, setCategoryFilter }) => {
  return (
    <Dropdown className="mb-3 w-100">
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="rounded-3 shadow-sm"
      >
        Subject: {categoryFilter || "All Categories"}
      </Dropdown.Toggle>

      <Dropdown.Menu className=" rounded-3 shadow-sm">
        <Dropdown.Item onClick={() => setCategoryFilter("")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => setCategoryFilter("Geography")}>
          Geography
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCategoryFilter("Physics")}>
          Physics
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setCategoryFilter("History")}>
          History
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PrelimsCategoryDropdown;
