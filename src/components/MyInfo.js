import styled from 'styled-components';


const Wrapper = styled.div`
  line-height: 24px;
  >section p { 
    font-size: clamp(10px, 16px, 5vw);
  }
`;

const MyInfo = () => {
  return (
    <Wrapper>
      <section>
        <div>
          <h1>안녕하세요 박준수 입니다.</h1>
          <p>
          앞서서 내가 뭐하는 사람이고 saas같이 (?)무슨 (?)뭐시기를 쓰고 

SaaS(Software as a Service)는 클라우드 기반의 소프트웨어 제공 모델로,
클라우드 제공업체가 클라우드 애플리케이션 소프트웨어를 개발 및 유지 관리하고,
 자동 소프트웨어 업데이트를 제공하고, 인터넷을 통해 Pay-as-you-Go 방식으로 고객에게 소프트웨어를 제공합니다.
연결된 교차 비즈니스 솔루션


지금 개발언어의 패턴은 (?)무엇이며 이것과 관련 또는 연계해서 (?)어떤 언어나 라이브러리(파생되어 나온거) 

MVVM은 UI와 비즈니스 로직을 분리하여 개발 생산성을 높이고 유지보수를 용이하게 하는 디자인 패턴입니다. 
LWC에서도 이러한 MVVM의 장점을 적극적으로 활용하고 있습니다.

LWC와 React는 컴포넌트 기반 개발이라는 공통점을 가지고 있지만,
컴포넌트 기반 개발: LWC와 React 모두 컴포넌트를 기반으로 UI를 구성한다는 점에서 유사합니다.
JSX와 유사한 문법: LWC는 HTML과 JavaScript를 혼합하여 사용하는 문법을 제공하는데, 이는 React의 JSX와 비슷한 느낌을 줍니다.

React는 JavaScript 라이브러리이며, LWC는 Salesforce 플랫폼에서 제공하는 프레임워크입니다. 즉, LWC는 Salesforce 생태계에 특화되어 있으며,


또는 프레임워크(기존거에 벗어나 새로운 자신들만의 스타일로 만든거)를 공부하거나 - 할 예정이다

할 예정은 react를 공부하다보니 pReact가 궁금해졌고 next와 redux typeScript를 추가로 공부 할 예정
          </p>
          <p>
          요즘 기본적으로 가져가야할 것 
          리액트 리덕스 넥스트 타입스크립트 리액트네이티브도 하면 땡큐
          ( 공부해보면서 내가 지금 사용하는 스킬과 가장 유사한 것은 이런거여서 하기 편했다 뭐 이런 내용도 추가 )
          </p>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <p>min, max, clamp 사용해서 media쿼리없이 반응형 구현하기 </p>
          <p>gsap 사용하기</p>
        </div>

      </section>
    </Wrapper>
    )
}
export default MyInfo;