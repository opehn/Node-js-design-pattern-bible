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

//다른 예제
//get: index로 접근할 때 index * 2 값을 반환한다
//has: in 연산자로 접근할 때 해당 숫자가 짝수인지 반환한다 
const evenNumbers = new Proxy([], {
  get: (target, index) => index * 2,
  has: (target, number) => number % 2 === 0,
});

console.log(2 in evenNumbers);
console.log(5 in evenNumbers);
console.log(evenNumbers[7]);
