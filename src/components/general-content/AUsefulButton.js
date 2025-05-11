import React, { useState } from "react";
import axios from "axios"; // To make API requests
import { showErrorToast } from "../../utils/toast";
const AUsefulButton = ({ initialCount = 0, userId, ansId }) => {
  const [count, setCount] = useState(initialCount);
  const [marked, setMarked] = useState(false);

  const handleClick = async () => {
    try {
      if (!userId) {
        showErrorToast("Login to mark answer useful");
        return;
      }
      // Send API request to backend to mark the answer as useful
      const response = await axios.post(
        `https://testback2-szuz.onrender.com/api/ans/answers/${ansId}/useful`,
        {
          userId: userId,
        }
      );

      if (response.status === 200) {
        const { message, usefulCount } = response.data;
        setMarked(!marked); // Toggle the marked state
        setCount(usefulCount); // Update the count with the response value
      }
    } catch (error) {
      console.error("Error marking the answer as useful:", error);
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

export default AUsefulButton;
