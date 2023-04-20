import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';
import { MainSocketEvents } from '../../app/types/main-socket-events';
import { getErrorMessage } from '../../helpers';
import { ColumnModel } from '../models/column';

export const deleteColumn: SocketEventHandler<{
  boardId: string;
  columnId: string;
}> = async (io, socket, data) => {
  try {
    if (!socket.user) {
      socket.emit(MainSocketEvents.columnsDeleteFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    if (!data.boardId) {
      socket.emit(MainSocketEvents.columnsDeleteFailure, {
        errors: [getErrorMessage('boardId required')],
      });
      return;
    }

    if (!data.columnId) {
      socket.emit(MainSocketEvents.columnsDeleteFailure, {
        errors: [getErrorMessage('columnId required')],
      });
      return;
    }

    const deletedColumn = await ColumnModel.findByIdAndDelete(data.columnId);

    if (!deletedColumn) {
      socket.emit(MainSocketEvents.columnsDeleteFailure, {
        errors: [getErrorMessage(`columnId ${data.columnId} not found`)],
      });
      return;
    }

    io.to(data.boardId).emit(
      MainSocketEvents.columnsDeleteSuccess,
      deletedColumn
    );
  } catch (err) {
    socket.emit(MainSocketEvents.columnsDeleteFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
