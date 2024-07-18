import styled from 'styled-components';

const MainContainer = styled.main`
  flex: 1;
  padding: 20px;
`;

const Main = ({ children }) => (
  <MainContainer>
    {children}
  </MainContainer>
);

export default Main;
