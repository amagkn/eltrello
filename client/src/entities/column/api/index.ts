import { httpGet } from '../../../shared/lib/http';
import { environment } from '../../../shared/config/environment';
import { Column } from '../types/column';
import { CreateColumnDto } from '../types/create-column-dto';
import { mainSocket } from '../../../features/main-socket/main-socket';

export const getColumns = async (boardId: string): Promise<Column[] | null> =>
  httpGet(environment.REACT_APP_API_URL + `/column/all?boardId=${boardId}`);

export const createColumn = async (columnDto: CreateColumnDto) =>
  mainSocket.emitCreateColumn(columnDto);

export const deleteColumn = async (payload: {
  columnId: string;
  boardId: string;
}) => mainSocket.emitDeleteColumn(payload);

export const updateColumn = async (payload: {
  boardId: string;
  columnId: string;
  fields: { title: string };
}) => mainSocket.emitUpdateColumn(payload);
