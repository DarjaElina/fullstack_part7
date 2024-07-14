import { useContext } from 'react';
import UserContext from '../context/UserContext';

const UserStatus = () => {
  const [user, userDispatch] = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'CLEAR_USER' });
  };

  return (
    <div>
      {user.username} logged in<button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default UserStatus;
