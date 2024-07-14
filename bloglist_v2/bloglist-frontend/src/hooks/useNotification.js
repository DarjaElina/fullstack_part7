import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const useNotification = () => {
  const [, notificationDispatch] = useContext(NotificationContext);

  const setNotification = (message, type = 'success') => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message, type } });
  };

  const clearNotification = () => {
    notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
  };

  return { setNotification, clearNotification };
};

export default useNotification;