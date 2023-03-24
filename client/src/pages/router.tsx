import { createBrowserRouter } from 'react-router-dom';
import { AuthPage } from 'pages/auth/components/auth-page';

export const router = createBrowserRouter([
  { path: '/', element: <AuthPage /> },
]);
