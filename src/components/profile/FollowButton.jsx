// FollowButton.jsx
import React, { useState } from "react";

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <button
      onClick={handleFollow}
      className="btn btn-sm rounded-pill px-4"
      style={{
        backgroundColor: isFollowing ? "#f2f2f2" : "#007aff",
        color: isFollowing ? "#000" : "#fff",
        border: "none",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        fontWeight: "500",
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
