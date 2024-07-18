import { useMatch } from 'react-router-dom';

const usePath = (path) => {

  const match = useMatch(path);

  const findByParams = (array) => {
    return match ? array.find(item => item.id === match.params.id) : null;
  };

  return { findByParams };
};

export default usePath;