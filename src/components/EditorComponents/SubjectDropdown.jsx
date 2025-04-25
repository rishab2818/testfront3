import React from "react";
import { Form } from "react-bootstrap";
import {subjects} from "../../constants/subjects"
const SubjectDropdown = ({ value, onChange }) => {


  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold text-dark">Select Subject</Form.Label>
      <Form.Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-3 shadow-sm p-2"
        style={{ fontSize: "0.95rem" }}
      >
        <option value="">-- Select Subject --</option>
        {Object.entries(subjects).map(([id, subjectData]) => (
          <option key={id} value={id}>
            {subjectData.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SubjectDropdown;