import { useEffect } from 'react';
import { mainSocket } from '../main-socket';
import { queryClient } from '../../../shared/config/query-client';

export const useJoinBoard = (boardId: string) => {
  useEffect(() => {
    mainSocket.emitJoinBoard(boardId);

    mainSocket.listenCreateColumnSuccess(() =>
      queryClient.invalidateQueries(['getColumns', boardId])
    );

    mainSocket.listenCreateTaskSuccess(() =>
      queryClient.invalidateQueries(['getTasks', boardId])
    );

    mainSocket.listenUpdateBoardSuccess(() => {
      queryClient.invalidateQueries(['getBoard', boardId]);
    });

    return () => {
      mainSocket.emitLeaveBoard(boardId);
    };
  }, [boardId]);
};
