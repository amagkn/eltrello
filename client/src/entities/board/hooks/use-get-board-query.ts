import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../api';

export const useGetBoardQuery = (boardId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getBoard', boardId],
    queryFn: () => getBoard(boardId),
    enabled: Boolean(boardId),
  });

  return {
    getBoardData: data,
    getBoardIsLoading: isLoading,
  };
};
