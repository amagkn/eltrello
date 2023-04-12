import { useEffect, useState } from 'react';
import { mainSocket } from '../main-socket';
import { useAuthStore } from '../../auth/model/store';

export const useMainSocketConnection = () => {
  const [mainSocketIsReady, setMainSocketIsReady] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      mainSocket.setup(currentUser);
      setMainSocketIsReady(true);
    }
  }, [currentUser]);

  return { mainSocketIsReady };
};
