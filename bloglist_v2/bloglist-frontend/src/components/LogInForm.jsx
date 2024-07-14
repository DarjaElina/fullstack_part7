import { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import loginService from '../services/login';
import blogService from '../services/blogs';
import UserContext from '../context/UserContext';
import useNotification from '../hooks/useNotification';

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, userDispatch] = useContext(UserContext);
  const { setNotification } = useNotification();

  const loginMutation = useMutation({
    mutationFn: (user) => loginService.login(user),
    onSuccess: (user) => {
      userDispatch({ type: 'SET_USER', payload: user });
      setNotification('logged in successfully', 'success');
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
    },
    onError: (error) => {
      console.error(error);
      setNotification('wrong credentials', 'error');
    }
  });

  const login = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            data-testid="username"
            value={username}
            type="text"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LogInForm;
