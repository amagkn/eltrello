import { httpGet } from '../../../shared/lib/http';
import { environment } from '../../../shared/config/environment';
import { Column } from '../types/column';

export const getColumns = async (boardId: string): Promise<Column[] | null> =>
  httpGet(environment.REACT_APP_API_URL + `/boards/${boardId}/columns`);
