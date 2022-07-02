import "./App.css";
import React, { useReducer } from "react";
import { Quiz } from "./Component/Quiz";
import { QuizReducer } from "./Reducer/QuizReducer";

const initial_state = {
  quiz1: {
    start: false,
    score: 0,
    questions: [],
  },
  quiz2: {
    start: false,
    score: 0,
    questions: [],
  },
};

function App() {
  const [quizState, setQuizState] = useReducer(QuizReducer, initial_state);
  return (
    <div className="App">
      <div className="header">
        Cummalitive Score - {quizState.quiz1.score + quizState.quiz2.score}
      </div>
      <div className="quiz-container">
        {quizState.quiz1.start ? (
          <Quiz
            quiz={quizState.quiz1}
            quiz_type="quiz1"
            setQuizState={setQuizState}
          />
        ) : (
          <div className="quiz">
            <button
              onClick={() => {
                setQuizState({ type: { step: "START_QUIZ", quiz: "quiz1" } });
              }}
              className="start-btn"
            >
              Start Quiz1
            </button>
          </div>
        )}

        {quizState.quiz2.start ? (
          <Quiz
            quiz={quizState.quiz2}
            quiz_type="quiz2"
            setQuizState={setQuizState}
          />
        ) : (
          <div className="quiz">
            <button
              onClick={() => {
                setQuizState({ type: { step: "START_QUIZ", quiz: "quiz2" } });
              }}
              className="start-btn"
            >
              Start Quiz2
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
