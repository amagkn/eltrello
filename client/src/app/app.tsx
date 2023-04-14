import React from 'react';
import { useCurrentUserDataQuery } from 'entities/auth/hooks/use-current-user-data-query';
import { router } from 'pages';
import { RouterProvider } from 'react-router-dom';
import { useAuthStore } from 'entities/auth/model/store';

import { requestsWithToken } from 'app/interceptors/requests-with-token';
import { mainSocket } from '../entities/main-socket/main-socket';
import { Loader } from '../shared/components/loader';

requestsWithToken();

export const App: React.FC = () => {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const { currentUserDataIsLoading } = useCurrentUserDataQuery(
    (currentUser) => {
      setCurrentUser(currentUser);
      mainSocket.setup(currentUser);
    }
  );

  if (currentUserDataIsLoading) return <Loader />;

  return <RouterProvider router={router} />;
};
