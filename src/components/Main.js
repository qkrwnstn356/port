import {useState, useEffect} from 'react'
// import MyInfo from './MyInfo';
// import Project from './Project';
// import Skills from './Skills';
import Bomb from '../game/Bomb';
import Worms from '../game/Worms';
import styled from 'styled-components';
// import { gsap } from "gsap";
// import {skills, projectList} from '../data';
const Wrapper = styled.div`
    display: flex;
    width: inherit;
    height: auto;
    min-height: 100vh;
    background-color: #000;
    color: #fff;
    overflow: hidden;
    position: relative;
    > div section {
      padding: 20px 40px;
    }
    > div:first-child {
      flex: 1;
      border-right: 1px solid #fff;
      box-shadow: 2px 2px 20px 0px rgba(255, 255, 255, .3);
    }
    > div:nth-child(2) {
      flex: 1.5;
      section {
        border-bottom: 1px solid #fff;
      }
    }
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border: 2px solid #333;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        z-index: 1000;
    }
    
    .close-button {
        position: absolute;
        top: 15px;          // 위로 더 올려서 테두리와 겹치지 않게
        right: 15px;        // 오른쪽으로 더 이동
        background-color: #fff;  // 배경색 추가
        border: 2px solid #333;  // 테두리 추가
        border-radius: 50%;      // 동그랗게
        width: 30px;            // 너비 설정
        height: 30px;           // 높이 설정
        cursor: pointer;
        font-size: 20px;        // 폰트 크기 증가
        font-weight: 700;       // 더 굵게
        color: #333;
        display: flex;          // 가운데 정렬을 위해
        align-items: center;    // 세로 가운데 정렬
        justify-content: center; // 가로 가운데 정렬
        z-index: 1001;          // popup보다 높은 z-index
        box-shadow: 0 0 5px rgba(0,0,0,0.3); // 그림자 효과
        
        &:hover {
            background-color: #f0f0f0; // 호버 효과
            transform: scale(1.1);      // 호버시 살짝 커지는 효과
            transition: all 0.2s ease;  // 부드러운 전환 효과
        }
    }
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    color: #fff;
    
    .icon {
        font-size: 40px;
        transition: transform 0.2s ease;
    }
    
    &:hover .icon {
        transform: scale(1.1);
    }
    
    .label {
        font-size: 14px;
        margin-top: 5px;
    }
`;

const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleIconClick = (component) => {
    setActiveComponent(component);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
      setIsPopupOpen(false);
      setActiveComponent(null);
  };


  useEffect(() => {
    const handleScroll = () => {
      // gsap.to('.test', {
      //   opacity: window.scrollY > 100 ? 1 : 0,
      //   scale: window.scrollY > 100 ? 1 : 0.5,
      //   duration: 0.5, // 애니메이션 지속 시간
      // });

      // gsap.to('.project-wrapper', {
      //   opacity: window.scrollY > 200 ? 1 : 0,
      //   scale: window.scrollY > 200 ? 1 : 0.5,
      //   duration: 0.5, // 애니메이션 지속 시간
      // });

    //   gsap.utils.toArray('.animate-list li').forEach((element, index) => {
    //     gsap.fromTo(element, {
    //         opacity: 0,
    //         y: 50
    //     }, {
    //         opacity: 1,
    //         y: 0,
    //         scrollTrigger: {
    //             trigger: element,
    //             start: "top 80%",
    //             end: "bottom top",
    //             scrub: true,
    //             startDelay: index * 0.2 // 각 요소마다 0.2초씩 딜레이
    //         }
    //     });
    // });


    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (<>
    <Wrapper>
      <div>
        <IconButton onClick={() => handleIconClick('bomb')}>
            <span className="icon">💣</span>
            <span className="label">지뢰 찾기</span>
        </IconButton>
        <IconButton onClick={() => handleIconClick('worms')}>
            <span className="icon">🐛</span>
            <span className="label">지렁이 게임</span>
        </IconButton>

        {isPopupOpen && (
              <div className="popup">
                  <button className="close-button" onClick={closePopup}>X</button>
                  {activeComponent === 'bomb' ? <Bomb /> : <Worms />}
              </div>
          )}

      </div>
    </Wrapper>
    {/* <Wrapper>
<div>
  <MyInfo></MyInfo>
</div>
<div>
  <Skills skill={skills}></Skills>
  <Project proj={projectList}></Project>
</div>
</Wrapper> */}

  </>);
}

export default Main;