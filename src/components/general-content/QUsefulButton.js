import React, { useState } from "react";
import axios from "axios"; // To make API requests
import { showErrorToast } from "../../utils/toast";
const QUsefulButton = ({ initialCount = 0, userId, queId }) => {
  const [count, setCount] = useState(initialCount);
  const [marked, setMarked] = useState(false);

  const handleClick = async () => {
    try {
      if (!userId) {
        showErrorToast("Please login to mark question as useful");
        return;
      }

      // Send API request to backend to mark the question as useful
      const response = await axios.post(
        "https://testback2-szuz.onrender.com/api/que/mark-question-useful",
        {
          questionId: queId,
          userId: userId,
        }
      );

      if (response.status === 200) {
        const { message, useful } = response.data;
        setMarked(!marked); // Toggle the marked state
        setCount(useful); // Update the count with the response value
      }
    } catch (error) {
      console.error("Error marking the question as useful:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn"
      style={{
        backgroundColor: marked ? "#007aff" : "#f2f2f7",
        color: marked ? "#ffffff" : "#000000",
        fontWeight: 500,
        fontSize: "0.8rem",
        borderRadius: "999px",
        padding: "0.25rem 0.6rem",
        minWidth: "auto",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        border: "none",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
      }}
    >
      👍 {count}
    </button>
  );
};

export default QUsefulButton;
