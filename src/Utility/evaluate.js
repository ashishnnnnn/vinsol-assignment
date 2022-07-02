export const evaluate = (num1, num2, operator) => {
  if (operator === 0) {
    return num1 + num2;
  } else if (operator === 1) {
    return num1 - num2;
  } else if (operator === 2) {
    return num1 * num2;
  } else {
    return Math.ceil(num1 / num2);
  }
};
