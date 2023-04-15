import { httpGet } from '../../../shared/lib/http';
import { environment } from '../../../shared/config/environment';
import { Column } from '../types/column';
import { CreateColumnDto } from '../types/create-column-dto';
import { mainSocket } from '../../main-socket/main-socket';

export const getColumns = async (boardId: string): Promise<Column[] | null> =>
  httpGet(environment.REACT_APP_API_URL + `/boards/${boardId}/columns`);

export const createColumn = async (columnDto: CreateColumnDto) =>
  mainSocket.emitCreateColumn(columnDto);
