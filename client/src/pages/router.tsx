import { createBrowserRouter } from 'react-router-dom';
import { RegisterPage } from 'pages/auth/components/register-page';

export const router = createBrowserRouter([
  { path: '/register', element: <RegisterPage /> },
]);
