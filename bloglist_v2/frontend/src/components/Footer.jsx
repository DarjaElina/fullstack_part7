import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin: 0 auto;
  background-color: #333;
  color: #202020;
  text-align: center;
  margin: 20px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>Blog App created with React and Express.js</p>
      <p>© 2024</p>
    </StyledFooter>
  );
};

export default Footer;