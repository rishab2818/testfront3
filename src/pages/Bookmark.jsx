// Bookmark.jsx
import React, { useState, useContext } from "react";
import Prelims from "./Prelims";
import Mains from "./Mains";
import Concepts from "./Concepts";
import Notes from "./Notes";
import AuthContext from "../context/AuthContext";
const Bookmark = () => {
  const [activeTab, setActiveTab] = useState("Mains");
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const src = 1;
  const renderSection = () => {
    switch (activeTab) {
      case "Prelims":
        return <Prelims />;
      case "Mains":
        return <Mains src={src} userId={userId} />;
      case "Concepts":
        return <Concepts src={src} userId={userId} />;
      case "Notes":
        return <Notes src={src} userId={userId} />;
      default:
        return <Mains src={src} userId={userId} />;
    }
  };

  return (
    <div className="container my-4">
      {/* No ProfileCard here */}

      {/* Button group to switch components */}
      <div
        className="btn-group d-flex flex-wrap justify-content-center my-3"
        role="group"
      >
        {["Mains", "Concepts", "Notes", "General", "Prelims"].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`btn btn-sm btn-outline-primary ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render section based on active tab */}
      <div>{renderSection()}</div>
    </div>
  );
};

export default Bookmark;
