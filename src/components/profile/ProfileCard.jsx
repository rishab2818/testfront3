// ProfileCard.jsx
import React from "react";
import FollowButton from "./FollowButton";

const ProfileCard = ({ user, isPersonalProfile }) => {
  return (
    <div
      className="card mb-4 p-4 shadow rounded-4 border-0"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="d-flex flex-column flex-sm-row align-items-center text-center text-sm-start">
        <img
          src={user.profilePic}
          alt={user.name}
          className="rounded-circle mb-3 mb-sm-0"
          style={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
            border: "2px solid #e0e0e0",
          }}
        />
        <div className="ms-sm-4">
          <h5 className="mb-1">{user.name}</h5>
          <p className="text-muted small mb-2">{user.description}</p>
          <div className="d-flex justify-content-center justify-content-sm-start align-items-center mb-2">
            <small className="me-3 text-muted">
              <strong>{user.followers.length}</strong> Followers
            </small>
            <small className="text-muted">
              <strong>{user.following.length}</strong> Following
            </small>
          </div>
          <small className="text-muted">
            Points: <strong>{user.points}</strong>
          </small>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center justify-content-sm-start flex-wrap gap-2">
        {user.instagram && (
          <a
            href={user.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light btn-sm border rounded-pill px-3"
            style={{ fontWeight: "500" }}
          >
            Instagram
          </a>
        )}
        {user.linkedin && (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light btn-sm border rounded-pill px-3"
            style={{ fontWeight: "500" }}
          >
            LinkedIn
          </a>
        )}
        {user.twitter && (
          <a
            href={user.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light btn-sm border rounded-pill px-3"
            style={{ fontWeight: "500" }}
          >
            Twitter
          </a>
        )}
      </div>

      <div className="mt-4 text-center text-sm-end">
        {isPersonalProfile ? (
          <button className="btn btn-primary btn-sm rounded-pill px-4 shadow-sm">
            Edit Profile
          </button>
        ) : (
          <FollowButton />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
