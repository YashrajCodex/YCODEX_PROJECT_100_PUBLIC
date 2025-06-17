import React from "react";

export default function Options({ question, onAnswer, answer }) {
  const asAnswered = answer !== null;
  return (
    <div className="options">
      {question?.options.map((option, i) => (
        <button
          key={i}
          className={`btn btn-option ${
            asAnswered && i === answer ? "answer" : ""
          } ${
            asAnswered && i === question.correctOption ? "correct" : "wrong"
          }`}
          onClick={() => onAnswer({ type: "newAnser", payload: i })}
          disabled={asAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
