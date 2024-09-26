db --- import ---> blog
blog --- import ---> index.js

db, blog, index.js는 같은 패키지 내에 있으므로 (애초에 import도 한번만 되었지만) db 인스턴스는 한개다. 즉 싱글턴이다.

이렇게 싱글톤을 사용하는 것은 상태 기반 종속성..을 전달하는 가장 간단하고 즉각적이며 가독성이 높은 해결책이다.
하지만, 테스트 중에 데이터베이스의 mock가 필요하다면? 다른 데이터베이스를 사용하려면? 
이런 경우 싱글톤은 적절하게 구조화된 해결책을 구현하는 데 장애물이 될 수 있다.
-> 이것도 이해가 잘 되지 않음. 싱글톤의 문제가 아니라 DI를 하냐 안하냐의 문제 아닌감..?
 7-5-2에서 DI에 대해 다룸