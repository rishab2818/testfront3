import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfileCard from "../components/profile/ProfileCard";
import Prelims from "./Prelims";
import Mains from "./Mains";
import Concepts from "./Concepts";
import Notes from "./Notes";
import axios from "axios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Prelims");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { userId, personal_profile, data_source } = location.state || {};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://testback2-szuz.onrender.com/api/user/${userId}`
        );
        setUserData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, personal_profile]);

  const renderSection = () => {
    switch (activeTab) {
      case "Prelims":
        return <Prelims />;
      case "Mains":
        return <Mains src={data_source} userId={userId} />;
      case "Concepts":
        return <Concepts src={data_source} userId={userId} />;
      case "Notes":
        return <Notes src={data_source} userId={userId} />;
      default:
        return <Mains src={data_source} userId={userId} />;
    }
  };

  if (loading) {
    return <div className="container my-4">Loading profile...</div>;
  }

  if (error) {
    return <div className="container my-4">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="container my-4">User not found</div>;
  }

  return (
    <div className="container my-4">
      <ProfileCard user={userData} isPersonalProfile={personal_profile} />
      <div>
        <div
          className="btn-group btn-group-toggle d-flex justify-content-center my-3"
          data-toggle="buttons"
          style={{ flexWrap: "nowrap", overflow: "hidden" }}
        >
          {["Prelims", "Mains", "Concepts", "Notes", "General"].map((tab) => (
            <label
              key={tab}
              className={`btn btn-sm btn-outline-primary ${
                activeTab === tab ? "active" : ""
              }`}
              style={{
                flex: 1,
                minWidth: "0",
                whiteSpace: "normal",
                textAlign: "center",
                fontSize: "clamp(11px, 2.5vw, 14px)",
                padding: "0.4rem 0.5rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.2",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </label>
          ))}
        </div>

        {renderSection()}
      </div>
    </div>
  );
};

export default Profile;
