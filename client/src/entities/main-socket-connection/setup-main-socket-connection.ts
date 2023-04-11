import { setupSocket } from '../../shared/lib/socket';
import { environment } from '../../shared/config/environment';
import { CurrentUser } from '../auth/types/current-user';

export const setupMainSocketConnection = (currentUser: CurrentUser) => {
  setupSocket(environment.REACT_APP_SOCKET_URL, {
    token: currentUser.token,
  });
};
