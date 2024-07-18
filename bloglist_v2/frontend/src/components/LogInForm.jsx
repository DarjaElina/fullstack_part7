import { useState, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/login';
import blogService from '../services/blogs';
import UserContext from '../context/UserContext';
import useNotification from '../hooks/useNotification';

import styled from 'styled-components';
import { keyframes } from 'styled-components';

const shakeAnimation = keyframes`
  0% { translate: 0; }
  25% { translate: 5px 0; }
  50% { translate: -5px 0; }  
  100% { translate: 0; }  
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledForm = styled.form`
  border: 3px solid #ffd100;
  border-radius: 20px;
  color: #d6d6d6;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ffd100;
  width: 300px;
  color: #F3D9DC;
  padding: 10px;
  &:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid #ffd100;
    box-shadow:0 0 5px #ffd100;
  }
  &:user-invalid {
    animation: ${shakeAnimation} 0.2s 3;
    background-color: #171717;
    padding: 10px;
    border-radius: 10px;
    color: white;
    border: 1px solid #f90909;
  }
  `;

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, userDispatch] = useContext(UserContext);
  const { setNotification } = useNotification();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (user) => loginService.login(user),
    onSuccess: (user) => {
      userDispatch({ type: 'SET_USER', payload: user });
      setNotification('Logged in successfully!', 'success');
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      setNotification('The Username or Password is Incorrect. Try again.', 'error');
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
      <StyledForm onSubmit={login}>
        <h2>Log In to Application</h2>
        <InputWrapper>
          username
          <StyledInput
            data-testid="username"
            value={username}
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          password
          <StyledInput
            data-testid="password"
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </InputWrapper>
        <button type="submit">Log in</button>
      </StyledForm>
    </div>
  );
};

export default LogInForm;
