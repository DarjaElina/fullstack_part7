import ErrorContext from './context/NotificationContext';
import { useContext } from 'react';

const Error = () => {
  const [error] = useContext(ErrorContext);

  if (!error) {
    return null;
  }
  const styles = {
    color: 'red',
    fontSize: '20px',
    marginBottom: '5px',
  };
  return <div style={styles}>{error}</div>;
};

export default Error;