import { StackCalculator } from "./stack-calculator.js";

const safeCalculatorHandler = {
  get: (target, property) => {
    if (property === "divide") {
      //프록시 된 함수
      return function () {
        //추가적인 검증 로직
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw Error("Division by 0");
        }
        return target.divide();
      };
    }
    return target[property];
  },
};

const calculator = new StackCalculator();
const safeCalculator = new Proxy(calculator, safeCalculatorHandler);

calculator.putValue(3);
calculator.putValue(0);

try {
  safeCalculator.divide();
} catch (e) {
  console.log("Error : " + e.message);
}
console.log(safeCalculator instanceof StackCalculator);
