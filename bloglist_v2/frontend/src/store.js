import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import blogNotificationReducer from './reducers/blogNotificationReducer';
import userNotificationReducer from './reducers/userNotificationReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogNotification: blogNotificationReducer,
    userNotification: userNotificationReducer,
    blogs: blogReducer,
    user: userReducer,
  }
});

export default store;