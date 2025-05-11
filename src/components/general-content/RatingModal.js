import React, { useState } from "react";
import axios from "axios"; // Make sure axios is imported
import { StarFill } from "react-bootstrap-icons";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../utils/toast";
const fields = [
  { name: "structureClarity", label: "Structure & Clarity" },
  { name: "factualAccuracy", label: "Factual Accuracy" },
  { name: "presentation", label: "Presentation" },
  { name: "depthOfAnalysis", label: "Depth of Analysis" },
  { name: "relevanceToQuestion", label: "Relevance to Question" },
  { name: "overallRating", label: "Overall Rating" },
];

const RatingModal = ({ answerId, onClose, userId }) => {
  const [ratings, setRatings] = useState({
    structureClarity: 0,
    factualAccuracy: 0,
    presentation: 0,
    depthOfAnalysis: 0,
    relevanceToQuestion: 0,
    overallRating: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleRating = (field, value) => {
    setRatings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!userId) {
      showErrorToast("User ID is missing. Please log in.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await axios.post(
        `https://testback2-szuz.onrender.com/api/ans/answers/${answerId}/rate`,
        {
          userId,
          ratings,
        }
      );

      if (response.status === 200) {
        showSuccessToast(
          response.data.message || "Rating submitted successfully!"
        );
        onClose();
      } else {
        showWarningToast("Operation completed with some warnings.");
      }
    } catch (error) {
      showErrorToast("An error occurred during submission.");
      console.error("Error submitting rating:", error);
      alert(error.response?.data?.message || "Failed to submit rating.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "400px" }}
      >
        <div
          className="modal-content rounded-4 shadow-sm"
          style={{ border: "none" }}
        >
          <div className="modal-header border-0">
            <h5 className="modal-title">Rate the Answer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {fields.map((field) => (
              <div key={field.name} className="mb-3">
                <div
                  className="mb-1"
                  style={{ fontSize: "0.9rem", fontWeight: "500" }}
                >
                  {field.label}
                </div>
                <div className="d-flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarFill
                      key={star}
                      size={20}
                      style={{ cursor: "pointer" }}
                      color={
                        ratings[field.name] >= star ? "#ffd700" : "#e0e0e0"
                      }
                      onClick={() => handleRating(field.name, star)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-primary w-100 rounded-3"
              onClick={handleSubmit}
              disabled={submitting}
              style={{ backgroundColor: "#007aff", borderColor: "#007aff" }}
            >
              {submitting ? "Submitting..." : "Submit Rating"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
