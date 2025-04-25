import React from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const PrivacySelector = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold text-dark">Privacy</label>
      <ToggleButtonGroup
        type="radio"
        name="privacy"
        value={value}
        onChange={onChange}
        className="d-flex gap-2 flex-wrap"
      >
        <ToggleButton
          id="privacy-public"
          value="public"
          variant={value === "public" ? "primary" : "outline-primary"}
          className="rounded-3 px-3 py-2 shadow-sm fw-medium flex-fill"
        >
          🌍 Public
        </ToggleButton>
        <ToggleButton
          id="privacy-private"
          value="private"
          variant={value === "private" ? "primary" : "outline-primary"}
          className="rounded-3 px-3 py-2 shadow-sm fw-medium flex-fill"
        >
          🔒 Private
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default PrivacySelector;