import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { evaluate } from "../Utility/evaluate";

const operators = ["+", "-", "*", "/"];

export const Quiz = ({ quiz, quiz_type, setQuizState }) => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 20) + 1);
  const [operator, setOperator] = useState(Math.floor(Math.random() * 4));
  const [userInput, setUserInput] = useState("");
  const [timer, setTimer] = useState(20);
  const toNextQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setOperator(Math.floor(Math.random() * 4));
    setUserInput("");
    setTimer(20);
    setQuizState({
      type: { step: "SAVE_ANSWER", quiz: quiz_type },
      payload: {
        question: "" + num1 + " " + operators[operator] + " " + num2,
        answer: evaluate(num1, num2, operator),
        user_answer: userInput,
      },
    });
  };
  useEffect(() => {
    let timeOut;
    if (timer === 0) {
      toNextQuestion();
    } else if (quiz.questions.length <= 19) {
      timeOut = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [timer]);

  return (
    <div className="quiz">
      <div className="quiz-header">{quiz_type.toUpperCase()}</div>
      {quiz.questions.length === 20 ? (
        <div className="question-list">
          <div className="score">Score - {quiz.score}</div>
          {quiz.questions.map((ele, idx) => (
            <div key={idx}>
              <div
                className={
                  Number(ele.answer) === Number(ele.user_answer)
                    ? "correct question"
                    : "incorrect question"
                }
                key={idx}
              >
                {ele.question}
              </div>
              <div className="answer">Answer - {ele.answer}</div>
            </div>
          ))}
          <button
            onClick={() => {
              setQuizState({ type: { step: "RESET", quiz: quiz_type } });
            }}
            className="Re-Start"
          >
            Restart
          </button>
        </div>
      ) : (
        <>
          <div className="timer">{timer}</div>
          <div className="question-no">
            <div>Question - {quiz.questions.length + 1}/ 20</div>
            <div>Score - {quiz.score}</div>
          </div>
          <div className="question">
            What is the value of {num1} {operators[operator]} {num2}
          </div>
          <input
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            placeholder="Enter Your Answer"
            className="input"
            value={userInput}
          />
          <br />
          <button
            onClick={toNextQuestion}
            className="submit"
            disabled={quiz.questions.length === 20}
          >
            Next
          </button>

          <div className="note">
            <strong>Note:-</strong> If number is in decimal enter the{" "}
            <strong>Ceil</strong>
            value of it.
          </div>
        </>
      )}
    </div>
  );
};
