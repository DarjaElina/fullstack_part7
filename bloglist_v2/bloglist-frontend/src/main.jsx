import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import blogNotificationReducer from './reducers/blogNotificationReducer';
import userNotificationReducer from './reducers/userNotificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogNotification: blogNotificationReducer,
    userNotification: userNotificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
