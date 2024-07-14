import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import LogInForm from './components/LogInForm';
import Notification from './components/Notification';
import UserStatus from './components/UserStatus';
import {
  handleUserLogin,
  addLocalStorageUser,
  handleUserLogout,
} from './reducers/userReducer';

const App = () => {
  const user = useSelector((state) => state.user);
  const loginNotification = useSelector((state) => state.userNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addLocalStorageUser());
  }, []);

  const handleLogin = async (userObject) => {
    dispatch(handleUserLogin(userObject));
  };

  const handleLogout = () => {
    dispatch(handleUserLogout());
  };

  return (
    <div>
      <h2 style={{ fontSize: '32px', fontStyle: 'italic', color: 'Pink' }}>
        Blog List
      </h2>
      <Notification notification={loginNotification} />
      {!user && <LogInForm onLogin={handleLogin} />}
      {user && (
        <div>
          <UserStatus username={user.name} onLogout={handleLogout} />
          <BlogList user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
