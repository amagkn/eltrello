import { useEffect } from 'react';
import { setupMainSocketConnection } from '../setup-main-socket-connection';
import { useAuthStore } from '../../auth/model/store';

export const useMainSocketConnection = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      setupMainSocketConnection(currentUser);
    }
  }, [currentUser]);
};
