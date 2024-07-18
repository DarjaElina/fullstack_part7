import { useContext, useEffect } from 'react';
import NotificationContext from '../context/NotificationContext';

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  useEffect(() => {
    if (notification?.message) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, notificationDispatch]);

  if (!notification) {
    return null;
  }

  const styles = {
    color: notification.type === 'error' ? '#bc4749' : '#F3D9DC',
    fontSize: '20px',
    marginBottom: '5px',
  };
  return <h2 style={styles}>{notification.message}</h2>;
};

export default Notification;
