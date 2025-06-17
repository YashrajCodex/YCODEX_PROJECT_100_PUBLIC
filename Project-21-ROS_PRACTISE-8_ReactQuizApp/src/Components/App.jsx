import React, { useEffect, useReducer } from "react";

import Header from "./Header.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Questions from "./Questions.jsx";
import MainBlock from "./MainBlock.jsx";
import Progress from "./Progress.jsx";
import FinishedScreen from "./FinishedScreen.jsx";

const initialValue = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timer: null,
};
const SECS = 20;

function reducer(state, actions) {
  switch (actions.type) {
    case "dataReceived":
      return { ...state, questions: actions.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "quizStart":
      return {
        ...state,
        status: "active",
        index: 0,
        timer: state.questions.length * SECS,
      };
    case "newAnser":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: actions.payload,
        points:
          actions.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "changeQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "quizComplete":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialValue, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        tick: state.tick - 1,
        status: state.timer === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Some error.");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, timer },
    dispatch,
  ] = useReducer(reducer, initialValue);

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:7070/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  console.log(maxPoints);
  return (
    <div className="app">
      <Header />
      <MainBlock>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen countQ={numQuestions} startQ={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              index={index}
              onAnswer={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} timer={timer} />
              {answer !== null && index < 15 && (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "changeQuestion" })}
                >
                  Next
                </button>
              )}
              {answer !== null && index === 15 && (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "quizComplete" })}
                >
                  Finish
                </button>
              )}
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainBlock>
    </div>
  );
}

function Timer({ dispatch, timer }) {
  const mins = Math.floor(timer / 60);
  const secs = Math.floor(timer % 60);
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return( () => clearInterval(id) )
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{secs < 10 && 0}
      {secs}
    </div>
  );
}
