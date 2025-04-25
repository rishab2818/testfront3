import React, { useState } from "react";
import "./PrelimsFeed.css"; // Optional: styling

const PrelimsCard = ({ question, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionIndex) => {
    if (selectedOption !== null) return; // Prevent voting again
    setSelectedOption(optionIndex);
    onVote(question.id, optionIndex); // Tell parent to update
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{question.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{question.category}</h6>
        <p className="card-text">Created by: {question.createdBy}</p>
        <p className="card-text"><small>{question.views} users found this useful</small></p>

        <div className="list-group">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`list-group-item list-group-item-action 
                ${selectedOption === index ? "active" : ""}`}
              onClick={() => handleOptionClick(index)}
              disabled={selectedOption !== null}
            >
              {option.text}
              {selectedOption !== null && (
                <span className="badge bg-primary rounded-pill float-end">
                  {option.votes} votes
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrelimsCard;
