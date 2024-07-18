import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const Status = styled.div`
  background-color: #ffd100;
  border-radius: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 7px;
  color: #202020;
`;

const UserStatus = () => {
  const [user, userDispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR_USER' });
    navigate('/');
  };

  return (
    <Status>
      {user.username} logged in
      <button onClick={handleLogout}>Log Out</button>
    </Status>
  );
};

export default UserStatus;
