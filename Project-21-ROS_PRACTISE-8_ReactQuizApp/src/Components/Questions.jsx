import React from "react";
import Option from "./Options";

export default function Questions({ question, onAnswer, answer }) {
  return (
    <div>
      <h4>{question?.question}</h4>
      <Option question={question} onAnswer={onAnswer} answer={answer} />
    </div>
  );
}
