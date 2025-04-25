import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Prelims from "./pages/Prelims";
import Mains from "./pages/Mains";
import QuestionsConcepts from "./pages/QuestionsConcepts";
import Notes from "./pages/Notes";
import AskPrelims from "./pages/AskPrelims";
import AskContent from "./pages/AskContent";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container } from "react-bootstrap";
import Concepts from "./pages/Concepts";
import Profile from "./pages/Profile";
import Bookmark from "./pages/Bookmark";
import AllAnswersPage from "./components/general-content/AllAnswersPage";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <GoogleOAuthProvider clientId="590318971789-rvsf8okm3ntgnei74ckk35i5fi4fjqb6.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <Toaster richColors position="top-center" />{" "}
          {/* 🔥 Toast container */}
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
          <div className="main-content">
            <Container>
              <Routes>
                <Route path="/" element={<Prelims />} />
                <Route path="/mains" element={<Mains />} />
                <Route path="/questions" element={<QuestionsConcepts />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/concepts" element={<Concepts />} />
                <Route path="/addprelims" element={<AskPrelims />} />
                <Route path="/addcontent" element={<AskContent />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookmark" element={<Bookmark />} />
                <Route
                  path="/answers/:questionId"
                  element={<AllAnswersPage />}
                />
              </Routes>
            </Container>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
