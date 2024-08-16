import { StackCalculator } from "../../8-1/8-1-1/stack-calculator.js";

const enhancedCalculatorHandler = {
  get(target, property) {
    if (property == "add") {
      return function add() {
        const addend2 = target.getValue();
        const addend1 = target.getValue();

        const result = addend1 + addend2;
        target.putValue(result);
        return result;
      };
    } else if (property == "divide") {
      return function () {
        //추가적인 검증 로직
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw Error("Division by 0");
        }
        //Subject 에 대한 유효한 위임자(delegates)일 경우
        return target.divide();
      };
    }
    return target[property];
  }
}

const calculator = new StackCalculator();
const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler);

enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());
