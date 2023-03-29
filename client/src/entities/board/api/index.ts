import { httpGet } from '../../../shared/api/http';
import { environment } from '../../../shared/misc/environment';
import { Board } from '../types/board';

export const getBoards = async (): Promise<Board[] | null> =>
  httpGet(environment.REACT_APP_API_URL + '/boards');
