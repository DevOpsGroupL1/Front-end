import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useApiGet = (key, fn, options) => {
  return useQuery({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
};

export const useApiSend = (fn, success, error, invalidateKey, options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      if (invalidateKey) {
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      }
      if (success) success(data);
    },
    onError: error,
    retry: 1,
    ...options,
  });
};
