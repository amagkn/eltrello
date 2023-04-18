import { useMutation } from '@tanstack/react-query';
import { createTask } from '../api';

export const useCreateTaskMutation = () => {
  const { mutate } = useMutation({
    mutationFn: createTask,
  });

  return {
    createTaskMutate: mutate,
  };
};
