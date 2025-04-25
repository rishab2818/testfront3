import React from "react";
import { Form } from "react-bootstrap";

const CategorySelector = ({ value, onChange }) => {
  const categories = {
    1: "General Question",
    2: "Mains",
    3: "Notes",
    4: "Concept"
  };

  return (
    <Form.Group>
      <Form.Label className="fw-semibold">Select Category</Form.Label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem" }}>
        {Object.entries(categories).map(([id, label]) => (
          <Form.Check
            key={id}
            type="radio"
            id={`category-${id}`}
            name="category"
            label={label}
            value={id}
            checked={value === id}
            onChange={(e) => onChange(e.target.value)}
            required
            style={{ marginBottom: 0 }}
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default CategorySelector;