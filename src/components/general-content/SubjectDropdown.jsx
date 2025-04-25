import React from "react";
import { Dropdown } from "react-bootstrap";
import { subjects } from "./constants/subjects";

const SubjectDropdown = ({ subjectFilter, setSubjectFilter }) => {
  const currentSubjectName = subjects[subjectFilter]?.name || "All";

  return (
    <Dropdown className="mb-3 w-100">
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="rounded-3 shadow-sm"
      >
        Subject: {currentSubjectName}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="rounded-3 shadow-sm"
        style={{ maxHeight: "300px", overflowY: "auto" }} // 🔵 Added scroll here
      >
        {Object.entries(subjects).map(([id, { name }]) => (
          <Dropdown.Item key={id} onClick={() => setSubjectFilter(Number(id))}>
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SubjectDropdown;
