import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { handleSuccess } from "../utils/auth";
import AuthContext from "../context/AuthContext";
import "./Navbar.css"; // We'll add styles here
const personal_data = 2;
const Navbar = ({ toggleSidebar }) => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="navbar custom-navbar shadow-sm fixed-top">
      <div className="container-fluid">
        <button
          className="btn btn-primary d-lg-none me-2"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <Link to="/" className="navbar-brand custom-brand">
          UPSC
        </Link>

        <div className="ms-auto">
          {user ? (
            <div className="d-flex align-items-center">
              <span
                className="user-name me-3"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/profile", {
                    state: {
                      userId: user._id,
                      personal_profile: true,
                      data_source: personal_data,
                    },
                  })
                }
              >
                {user.name}
              </span>
              <button
                className="btn btn-outline-primary btn-sm rounded-pill"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleSuccess(credentialResponse, login)
              }
              onError={() => console.error("Login Failed")}
              theme="filled_blue"
              size="medium"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
