import { useEffect } from 'react';
import { mainSocket } from '../main-socket';

export const useJoinBoard = (boardId?: string) => {
  useEffect(() => {
    if (boardId) {
      mainSocket.emitJoinBoard(boardId);

      return () => {
        if (boardId) mainSocket.emitLeaveBoard(boardId);
      };
    }
  }, [boardId]);
};
