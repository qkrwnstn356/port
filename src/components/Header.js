import styled from 'styled-components'

const Wrapper = styled.header`
    width: inherit;
    height: 40px;
    padding: 10px 40px;
    background-color: gray;
    color: #fff;
`;
const Header = () => {
 return (
    <Wrapper>
        <div>
            <h1>Header</h1>
        </div>
    </Wrapper>
 );
};

export default Header;