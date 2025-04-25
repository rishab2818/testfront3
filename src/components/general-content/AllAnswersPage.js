import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { subjects } from "./constants/subjects";
import QUsefulButton from "./QUsefulButton";
import AUsefulButton from "./AUsefulButton";
import BookmarkButton from "./BookmarkButton";
import RatingModal from "./RatingModal";
import AuthContext from "../../context/AuthContext";
import { Star } from "react-bootstrap-icons";
import RichTextEditor from "../../lexical/RichTextEditor";
import PrivacySelector from "../EditorComponents/PrivacySelector";
import AnonymousCheckbox from "../EditorComponents/AnonymousCheckbox";
import AddAnswerToggle from "../EditorComponents/AddAnswerToggle";

import { Button } from "react-bootstrap";
const AllAnswersPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [value, setValue] = useState("");
  const [addAnswer, setAddAnswer] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { user } = useContext(AuthContext);
  const isOnlyHtmlTags = (content) => {
    const htmlTagsRegex = /<([a-z][\s\S]*?)>/gi;
    const cleanedContent = content.replace(htmlTagsRegex, "");
    return cleanedContent.trim() === ""; // If only HTML tags, return true
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://testback2-szuz.onrender.com/api/ans/questions/${questionId}/answers`
        );

        setQuestion(res.data.question);
        setAnswers(res.data.answers);
      } catch (err) {
        console.error(err);
        setError("Failed to load question and answers.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questionId]);
  const handleSubmit = async () => {
    if (!user || !user._id) {
      console.log("User not logged in.");
      return;
    }

    if (!addAnswer || isOnlyHtmlTags(value)) {
      console.log("Please add valid content to the answer!");
      return;
    }

    try {
      const response = await axios.post(
        "https://testback2-szuz.onrender.com/api/ans/answers",
        {
          userId: user._id,
          questionId: question._id,
          content: value,
          author: isAnonymous ? "Anonymous" : user.name,
          tags: [], // You can collect tags separately if you want to allow tagging
          isPrivate: privacy === "private",
        }
      );

      console.log("Answer submitted!", response.data);

      // After successful submission:
      setAnswers((prevAnswers) => [response.data.answer, ...prevAnswers]);
      setValue(""); // Clear editor
      setAddAnswer(false); // Hide editor
    } catch (err) {
      console.error(err);
      console.log("Failed to submit answer.");
    }
  };

  const handleRatingButtonClick = (answerId) => {
    setSelectedAnswerId(answerId);
    setShowRatingModal(true);
  };

  const handleModalClose = () => {
    setShowRatingModal(false);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-5">
        <h5>Question not found</h5>
      </div>
    );
  }

  return (
    <div
      className="card mb-4 border-0 shadow-sm rounded-4"
      style={{
        backgroundColor: "#ffffff",
        padding: "1.5rem",
      }}
    >
      <div className="card-body p-0">
        {/* Question Title */}
        <h5 className="fw-semibold mb-4" style={{ fontSize: "1.5rem" }}>
          {question.title}
          {question.subject.map((subjId) => {
            const subject = subjects[subjId];
            return (
              <span
                key={subjId}
                style={{
                  color: subject?.color || "#666",
                  border: `1px solid ${subject?.color || "#ddd"}`,
                  borderRadius: "4px",
                  padding: "2px 6px",
                  marginLeft: "8px",
                  fontSize: "0.75rem",
                  display: "inline-block",
                }}
              >
                {subject?.name || "Unknown"}
              </span>
            );
          })}
        </h5>

        {/* Question Stats */}
        <div className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
          <div className="d-flex align-items-center gap-2">
            <span>{question.views} views</span>
            <QUsefulButton
              initialCount={question.useful}
              userId={user._id}
              queId={question._id}
            />
          </div>
        </div>
        <div className="mb-4">
          <AddAnswerToggle value={addAnswer} onChange={setAddAnswer} />
        </div>
        {addAnswer && (
          <div className="mb-4">
            <RichTextEditor
              placeholder="Add Content here..."
              name="post"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
            <div className="mb-4 mt-4">
              <PrivacySelector value={privacy} onChange={setPrivacy} />
            </div>

            <div className="mb-4 ">
              <AnonymousCheckbox
                value={isAnonymous}
                onChange={setIsAnonymous}
              />
            </div>
            <div className="mt-4">
              <Button
                variant="primary"
                size="sm"
                className="px-5 py-2 rounded-3 shadow-sm fw-semibold "
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        )}

        {/* Answers */}
        {answers.length > 0 ? (
          answers.map((ans) => (
            <div
              key={ans._id}
              className="p-3 mb-4 rounded-4 border shadow-sm"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div
                className="text-body mb-3"
                style={{ fontSize: "1rem", lineHeight: "1.6" }}
                dangerouslySetInnerHTML={{ __html: ans.content }}
              />

              {/* Answer Stats */}
              <div
                className="d-flex justify-content-between align-items-center text-muted"
                style={{ fontSize: "0.8rem" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span>{ans.views} views</span>

                  <AUsefulButton
                    initialCount={ans.useful}
                    userId={user._id}
                    ansId={ans._id}
                  />
                </div>

                {/* Rating Button */}
                <div
                  className="d-flex align-items-center gap-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRatingButtonClick(ans._id)}
                >
                  <Star size={14} color="#ffd700" /> {/* golden yellow */}
                  <span style={{ color: "#333" }}>
                    {ans.ratings?.overallRating || 0}
                  </span>
                </div>
              </div>

              {/* Bookmark & Author */}
              <div
                className="d-flex justify-content-between align-items-center mt-2"
                style={{ fontSize: "0.8rem" }}
              >
                <BookmarkButton userId={user._id} ansId={ans._id} />
                <div style={{ color: "#555" }}>
                  Answered by <strong>{ans.author || "Anonymous"}</strong>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="text-muted text-center py-5"
            style={{ fontSize: "1rem" }}
          >
            No answers yet. Be the first to answer!
          </div>
        )}
      </div>

      {/* Show Rating Modal */}
      {showRatingModal && (
        <RatingModal
          userId={user._id}
          answerId={selectedAnswerId}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default AllAnswersPage;
