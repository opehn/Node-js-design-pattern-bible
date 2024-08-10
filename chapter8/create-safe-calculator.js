import { StackCalculator } from "./stack-calculator.js";

function createSafeCalculator(calculator) {
  return {
    // 프록시된 함수
    divide() {
      //추가적인 검증 로직
      const divisor = calculator.peekValue();
      if (divisor === 0) {
        throw Error("Division by 0");
      }

      // Subject에 대한 유효한 위임자(delegate)일 경우
      return calculator.divide();
    },

    //위임된 함수들
    putValue(value) {
      return this.calculator.putValue(value);
    },

    getValue() {
      return this.calculator.getValue();
    },

    peekValue() {
      return this.calculator.peekValue();
    },

    clear() {
      return this.calculator.clear();
    },

    multiply() {
      return this.calculator.multiply();
    },
  };
}

const calculator = new StackCalculator();
const safeCalculator = createSafeCalculator(calculator);

calculator.putValue(3);
calculator.putValue(0);
try {
  safeCalculator.divide();
} catch (e) {
  console.log("Error: " + e.message);
}
