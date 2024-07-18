import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    reset,
    type,
    value,
    onChange
  };
};

export default useField;