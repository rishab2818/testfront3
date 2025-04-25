import React from "react";
import { Form } from "react-bootstrap";

const AnonymousCheckbox = ({ value, onChange }) => {
  return (
    <Form.Group>
      <Form.Check 
        type="checkbox"
        label="Post as Anonymous"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="fw-semibold"
      />
    </Form.Group>
  );
};

export default AnonymousCheckbox;
