import { useContext, useEffect, useReducer } from 'react';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import LogInForm from './components/LogInForm';
import Notification from './components/Notification';
import UserStatus from './components/UserStatus';
import UserContext from './context/UserContext';
import { NotificationContextProvider } from './context/NotificationContext';

const App = () => {
  const [user, userDispatch] = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'SET_USER', payload: user });
      blogService.setToken(user.token);
    }
  }, []);


  return (
    <div>
      <h2 style={{ fontSize: '32px', fontStyle: 'italic', color: 'Pink' }}>
        Blog List
      </h2>
      <NotificationContextProvider>
        <Notification />
        {!user && <LogInForm />}
        {user && (
          <div>
            <UserStatus />
            <BlogList />
          </div>
        )}
      </NotificationContextProvider>
    </div>
  );
};

export default App;
