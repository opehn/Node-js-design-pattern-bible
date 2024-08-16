import { StackCalculator } from "../../8-1/8-1-1/stack-calculator.js";

class EnhancedCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  add() {
    const addend2 = this.getValue();
    const addend1 = this.getValue();

    const result = addend1 + addend2;
    this.putValue(result);
    return result;
  }

  divide() {
    //추가적인 검증 로직
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }
    //Subject 에 대한 유효한 위임자(delegates)일 경우
    return this.calculator.divide();
  }

  //위임된 함수들
  putValue(value) {
    return this.calculator.putValue(value);
  }

  getValue(value) {
    return this.calculator.getValue(value);
  }

  peekValue(value) {
    return this.calculator.peekValue();
  }

  clear(){
    return this.calculator.clear();
  }

  multiply() {
    return this.calculator.multiply();
  }
}

const calculator = new StackCalculator();
const enhancedCalculator = new EnhancedCalculator(calculator);

enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());

