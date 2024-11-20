import styled from 'styled-components';

const Wrapper = styled.div`
  line-height: 24px;
  .project-wrap {
    padding-top: 20px;
  }
`;

const Project = ({proj}) => {
  console.log('data ==> ', proj)
  return (
    <Wrapper>
      <section className='project-wrapper'>
        <div>
          <div>
            <h1>참여한 프로젝트</h1>
            {proj.map((item, index) => {
              return <ul className='project-wrap' key={index}>
                <li>{index+1}. {item.title} ( {item.startDate} ~ {item.endDate} )</li>
                {item.taskList.map((tl, idx) => { return <li key={idx}>{tl.task}</li> })}
                <li>[ 사용한 개발 스킬 : {item.skills.map((sl, idx) => {
                    return (idx === item.skills.length - 1) ? <span key={idx}>{sl.name}</span> : <span key={idx}>{sl.name}, </span>  
                  })} ]
                </li>
              </ul>
            })}
          </div>
        </div>  
      </section>
    </Wrapper>
    )
}
export default Project;