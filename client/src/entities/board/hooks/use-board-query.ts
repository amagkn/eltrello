import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../api';

export const useBoardQuery = (boardId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getBoard', boardId],
    queryFn: () => getBoard(boardId!),
  });

  return {
    board: data,
    boardIsLoading: isLoading,
  };
};
