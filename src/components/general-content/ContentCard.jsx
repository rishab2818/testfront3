import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { subjects } from "./constants/subjects";
import QUsefulButton from "./QUsefulButton";
import AUsefulButton from "./AUsefulButton";
import BookmarkButton from "./BookmarkButton";
import { Eye, Star } from "react-bootstrap-icons";
import RatingModal from "./RatingModal"; // we will create this now
const personal_data = 2;
const ContentCard = ({ question, answer, user }) => {
  const [expanded, setExpanded] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const navigate = useNavigate();
  const handleExpand = () => setExpanded((prev) => !prev);

  // Convert to array if it's a single number (e.g., 2 -> [2])
  const subjectIds = Array.isArray(question.subject)
    ? question.subject
    : [question.subject];

  // Log each subject ID and its details

  return (
    <div
      className="card mb-4 border-0 shadow-sm rounded-4"
      style={{
        backgroundColor: "#ffffff",
        padding: "1.5rem",
      }}
    >
      <div className="card-body p-0">
        <h5 className="fw-semibold mb-3" style={{ fontSize: "1.25rem" }}>
          {question.title}
          {subjectIds.map((subjId) => {
            const subject = subjects[subjId];
            return (
              <span
                key={subjId}
                style={{
                  color: subject?.color || "#666",
                  border: `1px solid ${subject?.color || "#ddd"}`,
                  borderRadius: "4px",
                  padding: "2px 6px",
                  marginLeft: "6px",
                  fontSize: "0.75rem",
                  display: "inline-block",
                }}
              >
                {subject?.name}
              </span>
            );
          })}
        </h5>
        <div
          className="d-flex  align-items-center text-muted gap-2"
          style={{ fontSize: "0.8rem" }}
        >
          <Eye size={14} />
          <span>{question.views}</span>
          <QUsefulButton
            initialCount={question.useful}
            userId={user?._id}
            queId={question.questionId}
          />
        </div>

        {answer ? (
          <>
            <div className="mb-3" style={{ lineHeight: "1.6" }}>
              {expanded ||
              answer.content.replace(/<[^>]*>/g, "").split(" ").length <=
                200 ? (
                <div
                  className="text-body"
                  style={{ fontSize: "1rem" }}
                  dangerouslySetInnerHTML={{ __html: answer.content }}
                />
              ) : (
                <>
                  <div
                    className="text-body"
                    style={{ fontSize: "1rem" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        answer.content.split(" ").slice(0, 200).join(" ") +
                        "...",
                    }}
                  />
                  <button
                    className="btn btn-link p-0 mt-2"
                    style={{ fontSize: "0.9rem", textDecoration: "none" }}
                    onClick={handleExpand}
                  >
                    {expanded ? "Read less" : "Read more"}
                  </button>
                </>
              )}
            </div>
            <div
              className="d-flex justify-content-between align-items-center text-muted"
              style={{ fontSize: "0.8rem" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Eye size={14} />
                <span>{answer.views}</span>
                <AUsefulButton
                  initialCount={answer.useful}
                  userId={user?._id}
                  ansId={answer.answerId}
                />
              </div>
              <div
                className="d-flex align-items-center gap-1"
                style={{ cursor: "pointer" }}
                onClick={() => setShowRatingModal(true)}
              >
                <Star size={14} color="#ffd700" /> {/* golden yellow */}
                <span style={{ color: "#333" }}>
                  {answer.ratings?.overallRating || 0}
                </span>
              </div>
            </div>

            <div className="text-end mt-2">
              <BookmarkButton userId={user?._id} ansId={answer.answerId} />
            </div>

            <div
              className="text-end mt-2"
              style={{ fontSize: "0.8rem", color: "#555" }}
            >
              Answered by{" "}
              {answer.author && answer.author !== "Anonymous" ? (
                <strong
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate("/profile", {
                      state: {
                        userId: answer.userId,
                        personal_profile: false,
                        data_source: personal_data,
                      },
                    })
                  }
                >
                  {answer.author}
                </strong>
              ) : (
                <strong>Anonymous</strong>
              )}
            </div>
          </>
        ) : (
          <div className="text-muted">No answers yet.</div>
        )}
      </div>
      {answer ? (
        <div className="text-center mt-4">
          <a
            href={`#/answers/${question.questionId}`}
            className="text-primary text-decoration-none fw-semibold"
            style={{ fontSize: "0.9rem" }}
          >
            Show other answers
          </a>
        </div>
      ) : (
        <div className="text-center mt-4">
          <a
            href={`#/answers/${question.questionId}`}
            className="text-primary text-decoration-none fw-semibold"
            style={{ fontSize: "0.9rem" }}
          >
            Write your answer
          </a>
        </div>
      )}
      {showRatingModal && (
        <RatingModal
          userId={user?._id}
          answerId={answer.answerId}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </div>
  );
};

export default ContentCard;
