import styled from 'styled-components';

const Wrapper = styled.div`
  line-height: 24px;
  > section dl {
      padding-bottom: 20px;
    > dt { font-size: 22px; font-weight: bold; padding-bottom: 10px; }
    > dd {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 4px;
        >div {
          width: 30px;
          height: 30px;
        > img {
          width: 30px;
          height: 30px;
        }
      }
      > p {line-height: 26px}
      }
    }
  }
    
`;

const Skills = ({skill}) => {
  console.log('skill ==> ', skill)
  return (
    <Wrapper>
      <section className='test'>
        {skill.map((item, index) => (
          <dl key={index}>
              <dt>{item.title}</dt>
              <dd>
                {item.skilList.map((it, idx) => (
                    <div key={idx}>
                    <div><img src={it.img} alt={it.name}></img></div>
                    <p>{it.name}</p>
                    </div>
                ))}
              </dd>
          </dl>
        ))}
      </section>
    </Wrapper>
    )
}
export default Skills;