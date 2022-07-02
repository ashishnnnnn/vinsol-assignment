export const QuizReducer = (state, action) => {
  switch (action.type.step) {
    case "START_QUIZ":
      return {
        ...state,
        [action.type.quiz]: { ...state[action.type.quiz], start: true },
      };
    case "SAVE_ANSWER":
      const { question, answer, user_answer } = { ...action.payload };
      if (Number(answer) === Number(user_answer)) {
        return {
          ...state,
          [action.type.quiz]: {
            ...state[action.type.quiz],
            score: state[action.type.quiz].score + 1,
            questions: [
              ...state[action.type.quiz].questions,
              { question, answer, user_answer },
            ],
          },
        };
      } else {
        return {
          ...state,
          [action.type.quiz]: {
            ...state[action.type.quiz],
            questions: [
              ...state[action.type.quiz].questions,
              { question, answer, user_answer },
            ],
          },
        };
      }
    case "RESET":
      return {
        ...state,
        [action.type.quiz]: {
          start: false,
          score: 0,
          questions: [],
        },
      };
    default:
      return state;
  }
};
