import { useMutation } from '@tanstack/react-query';
import { updateTask } from '../api';

export const useUpdateTaskMutation = () => {
  const { mutate } = useMutation({
    mutationFn: updateTask,
  });

  return {
    updateTaskMutate: mutate,
  };
};
