import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { showErrorToast } from "../utils/toast";
const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useContext(AuthContext);
  const handleLinkClick = (path) => {
    if (path === "/bookmark" && !user?._id) {
      console.log("im here");
      showErrorToast("Please log in to access Bookmarks");
      return; // Prevent navigation
    }
    // Only close on small screens
    if (window.innerWidth < 992) {
      closeSidebar();
    }
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/" onClick={handleLinkClick("/")}>
            Prelims
          </Link>
        </li>
        <li>
          <Link to="/mains" onClick={handleLinkClick("/mains")}>
            Mains
          </Link>
        </li>
        <li>
          <Link to="/concepts" onClick={handleLinkClick("/concepts")}>
            Concepts
          </Link>
        </li>
        <li>
          <Link to="/notes" onClick={handleLinkClick("/notes")}>
            Notes
          </Link>
        </li>
        <li>
          <Link to="/addprelims" onClick={handleLinkClick("/addprelims")}>
            Add Prelims Question
          </Link>
        </li>
        <li>
          <Link to="/addcontent" onClick={handleLinkClick("/addcontent")}>
            Add Question Answer
          </Link>
        </li>

        {user?._id && (
          <li>
            <Link to="/bookmark" onClick={handleLinkClick}>
              Bookmarks
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
