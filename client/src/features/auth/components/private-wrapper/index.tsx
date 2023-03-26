import React, { PropsWithChildren } from 'react';

import { useAuthStore } from 'entities/auth/model/store';
import { Navigate } from 'react-router-dom';

export const PrivateWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return currentUser ? <>{children}</> : <Navigate to="/register" />;
};
