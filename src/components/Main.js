import {useEffect} from 'react'
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
        /* box-shadow: 4px 0px 20px 1px rgba(255, 255, 255, .3); */
      }
    }
`;

const Main = () => {

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
      {/* <MyInfo></MyInfo> */}
      <Bomb></Bomb>
    </div>
    <div>
      <Worms></Worms>
      {/* <Skills skill={skills}></Skills>
      <Project proj={projectList}></Project> */}
    </div>
  </Wrapper>
  </>);
}

export default Main;