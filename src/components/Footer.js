import styled from 'styled-components'

const Wrapper = styled.footer`
    width: inherit;
    height: 40px;
    padding: 10px 40px;
    background-color: gray;
    color: #fff;
`;

const Footer = () => {
    return (
        <Wrapper>
            <h1>Footer</h1>
        </Wrapper>
    );
}

export default Footer;