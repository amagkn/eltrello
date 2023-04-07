import { useQuery } from '@tanstack/react-query';
import { getBoards } from '../api';

export const useGetBoardsQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getBoards'],
    queryFn: getBoards,
  });

  return {
    getBoardsData: data,
    getBoardsIsLoading: isLoading,
  };
};
