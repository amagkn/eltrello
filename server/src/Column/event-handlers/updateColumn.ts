import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';
import { MainSocketEvents } from '../../app/types/main-socket-events';
import { getErrorMessage } from '../../helpers';
import { ColumnModel } from '../models/column';

export const updateColumn: SocketEventHandler<{
  boardId: string;
  columnId: string;
  fields: { title: string };
}> = async (io, socket, data) => {
  try {
    if (!socket.user) {
      socket.emit(MainSocketEvents.columnsUpdateFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    if (!data.boardId) {
      socket.emit(MainSocketEvents.columnsUpdateFailure, {
        errors: [getErrorMessage('boardId required')],
      });
      return;
    }

    if (!data.columnId) {
      socket.emit(MainSocketEvents.columnsUpdateFailure, {
        errors: [getErrorMessage('columnId required')],
      });
      return;
    }

    const updatedColumn = await ColumnModel.findByIdAndUpdate(
      data.columnId,
      data.fields,
      {
        new: true,
      }
    );

    if (!updatedColumn) {
      socket.emit(MainSocketEvents.columnsUpdateFailure, {
        errors: [getErrorMessage(`columnId ${data.columnId} not found`)],
      });
      return;
    }

    io.to(data.boardId).emit(
      MainSocketEvents.columnsUpdateSuccess,
      updatedColumn
    );
  } catch (err) {
    socket.emit(MainSocketEvents.columnsUpdateFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
