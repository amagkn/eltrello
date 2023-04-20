import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';
import { MainSocketEvents } from '../../app/types/main-socket-events';
import { getErrorMessage } from '../../helpers';
import { BoardModel } from '../models/board';

export const deleteBoard: SocketEventHandler<{
  boardId: string;
}> = async (io, socket, data) => {
  try {
    if (!socket.user) {
      socket.emit(MainSocketEvents.boardsDeleteFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    if (!data.boardId) {
      socket.emit(MainSocketEvents.boardsDeleteFailure, {
        errors: [getErrorMessage('boardId required')],
      });
      return;
    }

    const deletedBoard = await BoardModel.findByIdAndDelete(data.boardId);

    if (!deletedBoard) {
      socket.emit(MainSocketEvents.boardsDeleteFailure, {
        errors: [getErrorMessage(`boardId ${data.boardId} not found`)],
      });
      return;
    }

    io.to(data.boardId).emit(
      MainSocketEvents.boardsDeleteSuccess,
      deletedBoard
    );
  } catch (err) {
    socket.emit(MainSocketEvents.boardsDeleteFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
