import styled from 'styled-components';
import { TiThMenu } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import UserStatus from '../components/UserStatus';

const NavBarContainer = styled.nav`
  margin: 20px;
  padding: 5px;
  border-top: 2px solid #ffc43d;
  border-bottom: 2px solid #ffc43d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3em;
  position: relative;
  background-color: #333;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuIcon = styled(TiThMenu)`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    color: #fff;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const NavBar = ({ isOpen, setIsOpen }) => (
  <NavBarContainer>
    <MobileMenuIcon onClick={() => setIsOpen(!isOpen)}
      style={{
        color: '#fff',
        width: '30px',
        height: '30px',
        cursor: 'pointer'
      }}/>
    <NavItems>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      <Link to='/'>home</Link>
    </NavItems>
    <UserStatus/>
  </NavBarContainer>
);

export default NavBar;
