import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import {
  setUserNotificationTo,
  clearUserNotification,
} from './userNotificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const handleUserLogin = (userObj) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObj);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(
        setUserNotificationTo({
          message: 'logged in successfully',
          type: 'success',
        })
      );
      setTimeout(() => {
        dispatch(clearUserNotification());
      }, 5000);
    } catch (error) {
      console.log(error);
      dispatch(
        setUserNotificationTo({
          message: 'wrong credentials',
          type: 'error',
        })
      );
      setTimeout(() => {
        dispatch(clearUserNotification());
      }, 5000);
    }
  };
};

export const handleUserLogout = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogappUser');
  dispatch(clearUser());
};

export const addLocalStorageUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    dispatch(setUser(user));
    blogService.setToken(user.token);
  }
};

export default userSlice.reducer;
