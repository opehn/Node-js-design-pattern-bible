# 공개 생성자(Reveal constructor) 패턴

- 객체가 생성되는 순간에만 객체의 내부적인 기능의 일부를 노출하는 패턴
- 생성된 이후에는 불변 객체가 된다 - 특히 라이브러리, 프레임워크 등에서 사용자가 해당 객체를 copy 하지 않아도 불변이 보장된다는 점에서 유용할 수 있다

예제 설명
1. 먼저 생성자의 인자에 지정된 크기의 새로운 Node.js버퍼(buffer)를 할당한다
2. buffer를 변경할 수 있는 함수들을 보관하는 객체 리터럴(modifiers)을 만든다
3. 그 후에 buffer 내부의 모든 속성들을 차례차례 살펴보면서 함수가 아닌 속성을 건너뛴다
4. 다음으로 속성이 함수이면서 이름이 MODIFIER_NAMES 배열에 있는 이름 중 하나인지 살펴봄으로써 현재의 속성이 버퍼를 수정할 수 있는 함수인지 식별한다.
   만일 맞다면, buffer 인스턴스에 바인드 한 후 modifiers 객체에 추가한다.
5. 함수가 modifier 함수가 아니면, 현재 인스턴스(this)에 직접 추가한다.
6. 생성자에서 입력으로 받은 실행 함수를 호출하면서 인자로 modifier 객체를 전달하면 실행 함수가 내부 buffer를 변경할 수 있다.

여기서 ImmutableBuffer는 사용자와 내부 buffer 객체 사이에서 프록시 역할을 한다.
buffer 인스턴스의 일부 함수는 ImmutableBuffer 인터페이스(주로 읽기전용)를 통해 직접 호출되는 반면,
다른 함수들을 실행 함수(modifiers 내 함수)에 전달된다.

의문: 실사용시에 "TypeError: immutable.write is not a function"이라는 에러가 발생한다고 책에 나와있는데 발생하지 않았다?

참고: nodejsdp.link/domenic-revealing-constructor
