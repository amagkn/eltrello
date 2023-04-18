import { useEffect } from 'react';
import { mainSocket } from '../main-socket';
import { queryClient } from '../../../shared/config/query-client';

export const useJoinBoard = (boardId: string) => {
  useEffect(() => {
    mainSocket.emitJoinBoard(boardId);

    mainSocket.listenCreateColumnSuccess(() =>
      queryClient.invalidateQueries(['getColumns'])
    );

    mainSocket.listenCreateTaskSuccess(() =>
      queryClient.invalidateQueries(['getTasks'])
    );

    return () => {
      mainSocket.emitLeaveBoard(boardId);
    };
  }, [boardId]);
};
