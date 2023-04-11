import React from 'react';
import { useGetCurrentUserQuery } from 'entities/auth/hooks/use-get-current-user-query';
import { router } from 'pages';
import { RouterProvider } from 'react-router-dom';
import { useAuthStore } from 'entities/auth/model/store';

import { requestsWithToken } from 'app/interceptors/requests-with-token';
import { useMainSocketConnection } from '../entities/main-socket-connection/hooks/use-main-socket-connection';

requestsWithToken();

export const App: React.FC = () => {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useMainSocketConnection();

  const { getCurrentUserIsLoading } = useGetCurrentUserQuery((currentUser) => {
    setCurrentUser(currentUser);
  });

  if (getCurrentUserIsLoading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
};
