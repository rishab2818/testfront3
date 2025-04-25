import React from "react";
import { Form } from "react-bootstrap";

const AddAnswerToggle = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <Form.Check
        type="switch"
        id="add-answer-switch"
        label="Add Answer"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="form-switch"
        style={{ fontWeight: 500 }}
      />
    </div>
  );
};

export default AddAnswerToggle;
