import React from 'react';
import { useCurrentUserDataQuery } from 'entities/auth/hooks/use-current-user-data-query';
import { router } from 'pages';
import { RouterProvider } from 'react-router-dom';
import { useAuthStore } from 'entities/auth/model/store';

import { requestsWithToken } from 'app/interceptors/requests-with-token';
import { useMainSocketConnection } from '../entities/main-socket-connection/hooks/use-main-socket-connection';

requestsWithToken();

export const App: React.FC = () => {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const { mainSocketIsReady } = useMainSocketConnection();

  const { currentUserDataIsLoading } = useCurrentUserDataQuery(
    (currentUser) => {
      setCurrentUser(currentUser);
    }
  );

  if (currentUserDataIsLoading || !mainSocketIsReady) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
};
