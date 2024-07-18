import { useQuery } from '@tanstack/react-query';

const useFetch = (key, fn, arg) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [key],
    queryFn: () => fn(arg)
  });

  return { data, isLoading, isError };
};

export default useFetch;