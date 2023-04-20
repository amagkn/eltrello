import { useEffect } from 'react';
import { mainSocket } from '../main-socket';
import { queryClient } from '../../../shared/config/query-client';
import { useNavigate } from 'react-router-dom';

export const useJoinBoard = (boardId: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    mainSocket.emitJoinBoard(boardId);

    mainSocket.listenCreateColumnSuccess(() =>
      queryClient.invalidateQueries(['getColumns', boardId])
    );

    mainSocket.listenDeleteColumnSuccess(() =>
      queryClient.invalidateQueries(['getColumns', boardId])
    );

    mainSocket.listenCreateTaskSuccess(() =>
      queryClient.invalidateQueries(['getTasks', boardId])
    );

    mainSocket.listenUpdateBoardSuccess(() => {
      queryClient.invalidateQueries(['getBoard', boardId]);
    });

    mainSocket.listenDeleteBoardSuccess(() => {
      navigate('/boards');
    });

    return () => {
      mainSocket.emitLeaveBoard(boardId);
    };
  }, [boardId]);
};
