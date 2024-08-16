import { StackCalculator } from "../../8-1/8-1-1/stack-calculator.js";

function patchCalculator(calculator) {
  calculator.add = function () {
    const addend2 = calculator.getValue();
    const addend1 = calculator.getValue();
    const result = addend1 + addend2;
    calculator.putValue(result);
    return result;
  };

  const divideOrig = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue();

    if (divisor === 0) {
      throw Error("Division by 0");
    }

    return divideOrig.apply(calculator);
  };
  return calculator;
}

const calculator = new StackCalculator();
const enhancedCalculator = patchCalculator(calculator);
enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());
