// BookmarkButton.js
import React, { useState } from "react";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";
import axios from "axios"; // Add axios to make API requests
import { showErrorToast, showSuccessToast } from "../../utils/toast";
const BookmarkButton = ({ userId, ansId }) => {
  const [bookmarked, setBookmarked] = useState(false);
  console.log(userId, ansId, "test");
  const handleClick = async () => {
    try {
      if (!userId || !ansId) {
        showErrorToast("Login to bookmark");
        return;
      }

      const response = await axios.post(
        `https://testback2-szuz.onrender.com/api/ans/answers/${ansId}/bookmark`,
        {
          userId,
        }
      );

      if (response.status === 200) {
        setBookmarked((prev) => !prev); // Toggle bookmark on success
        showSuccessToast(response.data.message);
        console.log(response.data.message); // Optional: log message like "Answer bookmarked" or "Answer unbookmarked"
      }
    } catch (error) {
      showErrorToast("Error toggling bookmark");
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn"
      style={{
        backgroundColor: bookmarked ? "#007aff" : "#f2f2f7",
        color: bookmarked ? "#ffffff" : "#000000",
        borderRadius: "999px",
        padding: "0.4rem",
        width: "2.2rem",
        height: "2.2rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        border: "none",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {bookmarked ? <BookmarkFill size={16} /> : <Bookmark size={16} />}
    </button>
  );
};

export default BookmarkButton;
