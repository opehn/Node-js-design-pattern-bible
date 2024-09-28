# 전략 패턴
전략 패턴을 사용하면 `컨텍스트`라는 객체를 활성화시켜 변수 부분을 `전략`이라는 별도의 상호 교환 가능한 객체로 추출하여 로직의 변경을 지원한다. 
상호 교환 가능한 객체란 동일한 인터페이스를 구현하여 서로 대체될 수 있는 객체들을 의미한다.
컨텍스트는 알고리즘 제품군의 공통적인 로직을 구현하는 반면, 전략은 가변적인 부분을 구현하여 컨텍스트가 입력값, 시트메 설정 또는 사용자 기본 설정과 같은 다양한 요소에 따라 동작을 조정할 수 있도록 한다. 
전략은 일반적으로 솔루션 제품군의 일부이며 컨텍스트에서 예상하고 있는 동일한 인터페이스를 구현한다.

전자상거라 웹사이트에서 주문을 처리하는 Order라는 객체가 있다고 해보자. 
Order에는 주문을 완료하고 사용자로부터 온라인 상점으로 자금을 이체하는 pay()라는 함수가 있다. 
다양한 결제 시스템을 지원하기 위한 몇 가지 옵션이 존재한다. 
- pay() 함수에서 if ..else문을 사용해 선택한 지불 옵션에 따라 작업을 완료한다 
- 지불의 처리를 사용자가 선택한 특정 결제 게이트웨이에 대한 로직을 구현한 전략 객체에 위임한다. 

첫번째 해결책에서는 Order 객체의 코드를 수정하지 않는 한 다른 결제 방법을 지원할 수 없다. 
또한 지불 옵션의 수가 증가하면 매우 복잡해질 수 있다. 
대신 전략(Strategy) 패턴을 사용하면 Order 객체가 사실상 무제한의 결제 방법을 지원할 수 있으며, 
다른 객체가 결제 작업을 위임받아 처리하고 Order 객체는 사용자, 구매 항목 및 해당 항목의 가격 같은 세부 정보만 관리하도록 범위를 제한할 수 있다. (책임의 분리)

## 9-1-1 여러 형식을 지원하는 환경설정 객체 
``` js
import { promises as fs } from "fs";
import objectPath from "object-path";

export class Config {
  constructor(formatStrategy) {
    this.data = {};
    this.formatStrategy = formatStrategy;
  }

  get(configPath) {
    return objectPath.get(this.data, configPath);
  }

  set(configPath, value) {
    return objectPath.set(this.data, configPath, value);
  }

  async load(filePath) {
    console.log(`Deserializing from ${filePath}`);
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePAth, "utf-8")
    );
  }
}
````

- config 파일은 여러 형식을 가질 수 있음. json일수도 있고, ini일수도 있고..
- 파일을 읽어들여 포맷에 맞게 파싱하는 로직을 formatStrategy라는 객체에 위임했다. 
- 이로써 Config의 수정 없이 여러 파일 형식을 적용할 수 있게 되었다. 

