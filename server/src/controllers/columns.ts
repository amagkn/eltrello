import { RequestHandlerWithPayload } from '../types/http/request-handler-with-payload';
import { ColumnModel } from '../models/column';
import { SocketEventHandler } from '../types/socket/socket-event-handler';
import { MainSocketEvents } from '../types/main-socket-events';
import { getErrorMessage } from '../helpers';

export const getColumns: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    if (!req.params.boardId) {
      return res.status(400).json({ errors: ['boardId required'] });
    }

    const columns = await ColumnModel.find({
      boardId: req.params.boardId,
    });

    res.json(columns);
  } catch (err) {
    next(err);
  }
};

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
