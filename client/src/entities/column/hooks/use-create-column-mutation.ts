import { useMutation } from '@tanstack/react-query';
import { createColumn } from '../api';

export const useCreateColumnMutation = () => {
  const { mutate } = useMutation({
    mutationFn: createColumn,
  });

  return {
    createColumnMutate: mutate,
  };
};
