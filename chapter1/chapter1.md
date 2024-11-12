# 1-1 Node.js 철학 
## 경량 코어
- Node.js 코어는 최소한의 기능만을 갖고, 코어의 바깥 부분에 유저랜드(userland) /유저스페이스(userspace)라 불리는 사용자 전용 모듈 생태계를 두는 방식을 지향해왔다.
- 이 원칙은 Node.js 문화에 엄청난 영향을 주었다. '엄격하게 관리되어 안정적이지만 느리게 진화'하는 대신, 커뮤니티가 사용자 관점에서 폭넓은 해결책을 실험해볼 수 있는 자유를 주었다.
- 생태계의 진화에 긍정적인 문화적 영향을 미쳤다.
## 경량 모듈
- 모듈 : Node.js에서 프로그램 코드를 구성하는 기본적인 수단
- 애플리케이션 및 재사용 가능한 라이브러리를 만들기 위한 구성 요소
- 작은 모듈을 지향 - 코드의 양 뿐만 아니라 범위의 측면에서도
- 이 원칙은 Unix 철학에 근거함
    - 작은 것이 아름답다
    각 프로그램은 한 가지 역할만 잘 하도록 만들어라
- Node.js에서는 이 개념에서 한 단계 더 나아가,패키지 관리자(npm, yarn)의 도움으로 각 패키지가 자신이 필요로 하는 버전의 종속성 패키지들을 갖도록 함으로써 종속성 지옥에서 벗어나게 해준다.
- 작은 모듈은 재사용성이라는 장점 외에도 다음의 장점이 있다.
    - 이해하기 쉽고 사용하기 쉽다
    - 테스트 / 유지보수가 쉽다
    - 사이즈가 작아 브라우저에서 사용하기에 완벽하다
## 작은 외부 인터페이스
- Node.js의 모듈은 최소한의 기능만 노출한다. -> 잘못 사용될 위험성을 낮춰준다
- 이를 달성하기 위해 많은 Node.js 모듈들은 단 하나의 함수나 클래스만을 노출시킨다.
- 또 Node.js의 모듈들은 확장보다는 사용되기 위해 만들어진 경우가 많다. 확장의 가능성을 금지하기 위해 모듈 내부 접근을 제한한다는 것이 덜 유연하다고 생각될 수 있지만, 유스케이스를 줄이고, 구현을 단순화하며, 유지보수를 용이하게 하고, 가용성을 높이는 여러 장점을 갖고 있다.
- 내부를 외부에 노출시키지 않기 위해 클래스보다 함수 노출을 선호한다.
    - DI를 안쓰면 클래스도 내부를 숨길 수 있는 것 같다. 하지만 상속/확장이 가능하다는 점에서는 내부가 여전히 드러난다고 할 수 있을지도..
## 간결함과 실용주의
- KISS 원칙 - Keep It Simple, Stupid
- 리처드 가브리엘은 간단한 기능이 소프트웨어를 위해서는 더 좋은 디자인이라는 모델을 묘사하기 위해 '불완전한 것이 낫다'는 용어를 만들었다
- 그의 에세이 'Worse is Better'에서
    - 디자인은 구현과 인터페이스 모두에서 단순해야 한다. 구현이 인터페이스보다 더 단순해야 한다는 것은 더욱 중요하다. 단순함이 디자인에서 가장 중요한 고려 사항이다.
- 완벽하고 모든 기능을 갖출 소프트웨어 vs 불완전하지만 단순한 소프트웨어 중 후자를 선택해야 한다는 것
- 구현을 위해 적은 노력이 들고, 가벼워서 빨리 보급 가능하며, 유지보수가 쉽고 빠른 이해가 가능하다 -> 커뮤니티의 기여를 보다 용이하게 하고 소프트우어 자체의 성장과 향상을 돕는다.
- Node.js에서 이 원칙이 채택되는 것에 가장 큰 영향을 준 것은 매우 실용적인 언어인 JavaScript이다
- 복잡한 클래스 계층을 대체하기 위해 간단한 클래스나 함수, 클로저를 사용한다
- 순수 객체지향 설계는 실제 세계의 복잡성과 불완전성을 고려하지 않을 수 있다. 소프트웨어가 항상 현실의 근사치이며, 많은 노력과 유지보수가 필요한 엄청난 양의 코드로 완벽에 가까운 소프트웨어를 만들어내려고 애쓰는 것보다 합리적인 복잡성을 가지고 빠르게 일할 때 더 많은 성공을 이뤄낼 수 있다.

# Node.js는 어떻게 동작하는가
- I/O는 느리다
    - RAM에 접근시 나노초가 소요되지만 디스크/네트워크에 접근시 밀리초 소요
    - RAM의 대역폭은 GB/s로 일정하게 유지되지만 디스크/네트워크 전송률은 MB/s에서 GB/s까지 다양
    - I/O는 CPU 자원은 많이 소모하지 않지만 요청 전송과 작업 완료까지 대기시간이 발생해 느려지게 됨. 또 사람이 하는 마우스 클릭으로 어플리케이션 입력이 일어나는 상황 속에서 I/O에는 인간이라는 불확실한 요소도 고려해야 함
## 블로킹 I/O
- 전통적인 블로킹 I/O 프로그래밍에서는 I/O를 요청이 끝날 때까지 스레드를 멈춤
- 한 스레드 내에서 여러 연결을 처리하지 못하기 때문에 여러 스레드를 생성
    - 동시에 받는 요청의 개수를 한정할 수 없으므로 요청이 올때마다 스레드를 생성하는 게 아닌 Thread Pool 방식을 주로 사용함
- 스레드는 비용이 저렴하지 않음. 여러 논리 흐름을 만들어내기 위해 컨텍스트 스위칭이 발생하고, 유휴 시간동안에도 메모리를 점유하게 됨
## 논블로킹 I/O
- I/O 요청이 완료되기를 기다리지 않고 (스레드를 멈추지 않고) 즉시 종료시키는 방식으로 I/O 요청을 처리
-> 하나의 스레드가 동시에 여러 요청을 받을 수 있음
- 완료되지 않은 여러 I/O 이벤트를 어떻게 처리할 것인가

 1. 폴링 방식
 ``` ts
 resources = [socketA, socketB, fileA]

 while (!resources.isEmpty()) {
    for(resource of resources) {
        data = resource.read();
        if(data === NO_DATA_AVAILABLE) {
            continue;
        }
        if (data === RESOURCE.CLOSED) {
            resource.remove(i);
        } else {
            consumeData(data);
        }
    }
 }
 ```
 - 완료되지 않은 이벤트의 상태를 루프 안에서 체크
 - CPU 소모가 많이 됨 (usleep을 걸면 나아질 수 있음)

2. 이벤트 디멀티플렉싱
- 위에서 본 폴링 방식 (busy-waiting)은 논 블로킹 리소스 처리를 위한 이상적인 기법이 아님
- 멀티 플렉싱은 전기통신 용어로 여러 신호를 하나로 합성하는 것, 디멀티플렉싱은 하나로 통합된 신호가 다시 원래의 구성요소로 분할되는 작업
- 여러 I/O를 하나의 자료구조에서 관리하다가 요청이 끝날때마다 개별적으로 처리하는.. 그런 과정이 여러 신호로 갈라지는 것과 비슷하다는 느낌으로 이해함
``` ts
watchedList.add(socketA, FOR_READ) //(1)
watchedList.add(fileB, FOR_READ) 
while(events = demultiplexer.watch(watchedList)) { //(2)
    //이벤트 루프
    for (event of events) {
        //블로킹하지 않으며 항상 데이터를 반환
        data = event.resource.read()
        if (data === RESOURCE_CLOSED) {
            demultiplexer.unwatch(event.resource);
        } else {
            //실제 데이터를 받으면 처리
            consumeData(data); //(3)
        }
    }
}
```
1. I/O 이벤트가 리스트에 추가
2. demultiplexer.watch()는 읽을 준비가 된 I/O 작업이 있을 때까지 블로킹됨, polling 방식인 것 처럼 보이지만 여기서 다르다
3. 반환된 I/O 이벤트가 처리됨.
4. 모든 이벤트가 처리되고 나면 이벤트 디멀티플렉스가 처리 가능한 이벤트를 반환하기 전까지 블로킹됨, 이를 이벤트 루프(event loop)라고 함

이로써 컨텍스트 스위칭으로 인한 CPU 자원 소모가 일어나지 않고, 유휴시간이 적은 방식으로 여러 I/O를 처리할 수 있게 되었다. 
이에 더해, 하나의 스레드가 관리하기 때문에 Race Condition이 일어나지 않는다는 엄청난 이점도 있다. 
## 1-2-5 리액터(Reactor) 패턴
이전 섹션에서 제시된 알고리즘에 특화된 리액터(Reactor) 패턴
- 각 I/O 작업에 연관된 핸들러를 갖는다. Node.js에서 핸들러는 콜백 함수에 해당한다. 
- 이 핸들러는 이벤트가 이벤트 루프에 의해 처리되는 즉시 호출된다. 

(리액터 패턴 그림36p 참고)
1. 애플리케이션이 **이벤트 디멀티플렉서**에 요청을 전달함으로써 새로운 I/O 작업을 생성. 이때 애플리케이션이 작업이 완료되었을 때 호출될 핸들러를 명시해서 넘겨준다.
**이벤트 디멀티플렉서**에 새 요청을 전달하는 것은 논블로킹 호출이며, 제어권은 애플리케이션으로 즉시 반환돤다.

2. I/O 작업이 완료되면 **이벤트 디멀티플렉서**는 완료된 이벤트 작업을 **이벤트 큐**에 집어넣는다.
3. 이 시점에서 **이벤트 루프**가 **이벤트 큐**의 항목들을 순환한다.
4. 각 이벤트와 관련된 핸들러가 호출된다.
5. 애플리케이션 코드의 일부인 핸들러의 실행이 완료되면 제어권을 **이벤트 루프**에 되돌려준다(5a). 핸들러 실행 중에 다른 비동기 작업을 요청할 수 있으며 (5b), 이는 **이벤트 디멀티플렉서**에 새로운 항목을 추가하는 것이다(1).
6. **이벤트 큐**의 모든 항목이 처리되고 나면 **이벤트 루프**는 **이벤트 디멀티플렉서**에서 블로킹되며 처리 가능한 새 이벤트가 있을 경우 이 과정이 다시 트리거된다.

리액터 패턴의 정의
- Reactor 패턴은 일련의 관찰 대상 리소스에서 새 이벤트를 사용할 수 있을 때까지 블로킹하여 I/O를 처리하고, 각 이벤트를 관련된 핸들러에 전달함으로써 반응합니다. 
## Libuv, Node.js의 I/O 엔진
- 각 운영체제는 Linux의 epoll, macOS의 kqueue, Window의 IOCP(I/O completion port)API와 같이 이벤트 디멀티플렉서를 위한 (완료된 I/O를 감지하기 위한) 서로 다른 자체 인터페이스를 갖고 있다. 게다가 같은 OS 내에서도 리소스 유형에 따라 동작이 달라질 수 있다.
- 여러 운영체제에 호환되며 여러 유형의 리소스에서 논블로킹 동작을 표준화해주는 C 라이브러리인 libuv가 Node.js에 내장되어 이러한 어려움을 해소한다.
- Libuv는 Node.js의 하위 수준의 I/O 엔진이다. 브라우저에서 동작하도록 만들어진 자바스크립트가 Node.js에서 운영체제와 소통할 수 있는 것도 Libuv의 덕분
## Node.js를 위한 구성
리액터 패턴과 libuv는 Node.js의 기본 구성요소지만 전체 플랫폼 구축을 위해서는 3개의 구성이 더 필요하다.
- libuv와 다른 저수준 기능들을 램핑하고 표출시키기 위한 바인딩 세트
- V8 엔진. 크롬 브라우저를 위해 구글이 개발한 Javascript 엔진으로 Node.js가 매우 빠르고 효율적인 이유 중 하나이다. V8은 혁신적인 설계와 속도 그리고 효율적인 메모리 관리로 높은 평가를 받고 있다.
- 고수준 Node.js API를 구현하고 있는 코어 Javascript 라이브러리

이것들이 Node.js의 구성요소이다. (38p 그림 참고)
# 1-3 Node.js에서의 Javascript
앞서 분석한 아키텍처에서 한 가지 중요한 점은 Node.js에서 사용하는 Javascript는 브라우에서 사용하는 Javascript와 다르다는 것이다. 운영체제와 소통이 가능한 것이 가장 큰 차이점

Node.js에서 Javascript를 사용할 때 명심해야 할 것들을 살펴보겠습니다
## 최신 Javascript를 실행시켜라
- 브라우저에서 Javascript를 사용할 때 주된 고충 중에 하나는 호환성 문제인데 Node.js 애플리케이션은 이미 잘 알려진 시스템이나 Node.js 런타임 위에서 동작한다. 호환성 문제가 적다

- Node.js는 가장 최신 버전의 V8을 가지고 있어 최신 ECMAScript 사양을 대부분 사용 가능하다

- 단 서드파티에서 사용되기 위한 라이브러리를 개발한다면 다양한 버전의 Node.js 에서 실행될 가능성을 고려해야 한다. 이 경우 일반적인 작업 방식은 LTS 지원 버전 중에 가장 오래된 것을 기준으로 삼고 package.json에 engines 섹션을 명시하는 것이다. 패키지 매니저는 사용자가 해당 Node.js 버전에 호환되지 않는 패키지를 설치하려고 할 때 경고할 것이다.
## 모듈 시스템
- Javascript에 모듈 시스템에 대한 공식적인 지원이 없었을 때 Node.js는 CommonJS라는 모듈 시스템을 사용
- 오늘날에는 ES 모듈 문법이 javascript에 내장되어 있어 이를 사용, 이는 브라우저에서와는 기본적 구현이 다른 것으로 Node.js에서는 문법만 상속받음
- 브라우저가 원격에 있는 모듈을 주로 다루는 반면 Node.js는 현재로는 오직 로컬 파일시스템에 있는 모듈만 다룰 수 있음

## 운영체제 기능에 대한 모든 접근
- Node.js는 Javascript를 사용하지만 브라우저 영역 안에서 실행되지 않음
-> Node.js가 운영체제에서 기본적으로 제공하는 주된 서비스들에 바인딩할 수 있게 해줌
- 예를 들어 fs 모듈의 도움으로 파일 시스템에 있는 파일에 접근 가능하며 net과 dgram 모듈로 저수준의 TCP 또는 UDP 소켓을 사용할 수 있음
- 또한 v8 모듈을 사용해 V8 내부 여러 곳에 접근이 가능하고, vm 모듈을 사용해 V*의 다른 문맥 상에서 코드를 실행시킬 수 있다
- 또 child_process 모듈을 사용해 다른 프로세스를 실행시키거나 전역 변수 process를 사용해 어플리케이션이 돌고 있는 프로세스의 정보를 가져올 수 있다
- process 전역변수에서 process.env로 프로세스에 할당된 환경변수 목록과 애프리케이션 실행 시 할당된 커맨드라인 인자들을 (process.argv를 사용해) 가져올 수 있다
## 네이티브 코드 실행
- Node.js가 제공하는 가장 강력한 능력 중 하나는 네이티브 코드에 바인드할 수 있는 사용자측 모듈을 만드는 것이 가능하다는 점
- C/C++로 이미 만들어져 있거나 새로 만들어진 컴포넌트를 사용할 수 있다 (N-API 인터페이스 사용)
- 이로 인해 이미 존재하고 있는 막대한 양의 오픈 소스를 재사용할 수 있으며, C/C++ 레거시를 재사용할 수 있다
- Node.js는 네이티브 코드와 연결될 수 있는 능력 덕분에 사물인터넷이나 홈메이드 로보틱스 세게에서도 점차 인기를 얻고 있다.
- V8은 Javascript 실행에 있어서 매우 빠르게 동작하지만 네이티브 코드와 비교했을 때 여전히 수행능력에 손실이 따른다. 일상적인 일은 아니지만 엄청난 양의 데이터를 처리해야 하는 CPU 집약적 어플리캐이션의 경우 이러한 작업을 네이티브 코드에 위임할 수 있다.
- 현재 Node.js를 포함한 대부분의 Javascript 가상머신(VM)은 Javascript 이외의 언어(C++ 또는 Rust)를 Javascript VM들이 이해 가능한 형식으로 컴파일할 수 있게 해주는 저수준 명령 형식인 웹어셈블리(WASM)를 지원한다.