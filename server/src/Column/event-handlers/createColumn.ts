import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';
import { MainSocketEvents } from '../../app/types/main-socket-events';
import { getErrorMessage } from '../../helpers';
import { ColumnModel } from '../models/column';

export const createColumn: SocketEventHandler<{
  title: string;
  boardId: string;
}> = async (io, socket, data) => {
  try {
    if (!socket.user) {
      socket.emit(MainSocketEvents.columnsCreateFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    const newColumn = new ColumnModel({
      title: data.title,
      boardId: data.boardId,
      userId: socket.user.id,
    });

    const savedColumn = await newColumn.save();

    io.to(data.boardId).emit(
      MainSocketEvents.columnsCreateSuccess,
      savedColumn
    );
  } catch (err) {
    socket.emit(MainSocketEvents.columnsCreateFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
