import { StackCalculator } from "./stack-calculator.js";

function patchToSafeCalculator(calculator) {
  const divideOrig = calculator.divide;
  calculator.divide = () => {
    //추가적인 검증 로직
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    //Subject에 유효한 위임자일 경우
    return divideOrig.apply(calculator);
  };

  return calculator;
}

const calculator = new StackCalculator();
const safeCalculator = patchToSafeCalculator(calculator);

calculator.putValue(3);
calculator.putValue(10);

try {
  console.log(safeCalculator.divide());
} catch (e) {
  console.log("Error: " + e.message);
}
