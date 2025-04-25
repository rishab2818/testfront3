import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const handleLinkClick = () => {
    // Only close on small screens
    if (window.innerWidth < 992) {
      closeSidebar();
    }
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Prelims
          </Link>
        </li>
        <li>
          <Link to="/mains" onClick={handleLinkClick}>
            Mains
          </Link>
        </li>
        <li>
          <Link to="/concepts" onClick={handleLinkClick}>
            Concepts
          </Link>
        </li>
        <li>
          <Link to="/notes" onClick={handleLinkClick}>
            Notes
          </Link>
        </li>
        <li>
          <Link to="/addprelims" onClick={handleLinkClick}>
            Add Prelims Question
          </Link>
        </li>
        <li>
          <Link to="/addcontent" onClick={handleLinkClick}>
            Add Question Answer
          </Link>
        </li>
        <li>
          <Link to="/bookmark" onClick={handleLinkClick}>
            Bookmarks
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
