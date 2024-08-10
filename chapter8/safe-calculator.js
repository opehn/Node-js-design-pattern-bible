// 0으로 나눴을 때, infinity를 반환하기 보다 명시겆 오류를 생성시키는 보다 보수적인 동작을 하도록 변경
//객체 컴포지션 사용

import { StackCalculator } from "./stack-calculator.js";

class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  //프록시 함수
  divide() {
    //추가적인 검증 로직
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw Error("Division by 0");
    }

    //Subject에 대한 유효한 위임자(delegate)일 경우
    return this.calculator.divide();
  }

  //위임된 함수들
  putValue(value) {
    return this.calculator.putValue(value);
  }

  getValue() {
    return this.calculator.getValue();
  }

  peekValue() {
    return this.calculator.peekValue();
  }

  clear() {
    return this.calculator.clear();
  }

  multiply() {
    return this.calculator.multiply();
  }
}

const calculator = new StackCalculator();
const safeCalculator = new SafeCalculator(calculator);

calculator.putValue(10);
calculator.putValue(0);
try {
  console.log(safeCalculator.divide());
} catch (e) {
  console.log("Error : " + e.message);
}
