import { useQuery } from '@tanstack/react-query';
import { Board } from '../types/board';
import { getBoards } from '../api';

export const useGetBoardsQuery = (onSuccess?: (boards: Board[]) => void) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getBoards'],
    queryFn: getBoards,
    onSuccess,
  });

  return {
    getBoardsData: data,
    getBoardsIsLoading: isLoading,
  };
};
