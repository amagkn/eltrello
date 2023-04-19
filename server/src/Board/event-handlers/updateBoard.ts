import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';
import { MainSocketEvents } from '../../app/types/main-socket-events';
import { getErrorMessage } from '../../helpers';
import { BoardModel } from '../models/board';

export const updateBoard: SocketEventHandler<{
  boardId: string;
  fields: { title: string };
}> = async (io, socket, data) => {
  try {
    if (!socket.user) {
      socket.emit(MainSocketEvents.boardsUpdateFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    if (!data.boardId) {
      socket.emit(MainSocketEvents.boardsUpdateFailure, {
        errors: [getErrorMessage('boardId required')],
      });
      return;
    }

    const updatedBoard = await BoardModel.findByIdAndUpdate(
      data.boardId,
      data.fields,
      {
        new: true,
      }
    );

    if (!updatedBoard) {
      socket.emit(MainSocketEvents.boardsUpdateFailure, {
        errors: [getErrorMessage(`boardId ${data.boardId} not found`)],
      });
      return;
    }

    io.to(data.boardId).emit(
      MainSocketEvents.boardsUpdateSuccess,
      updatedBoard
    );
  } catch (err) {
    socket.emit(MainSocketEvents.boardsUpdateFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
