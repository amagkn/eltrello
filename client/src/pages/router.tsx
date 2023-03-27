import { createBrowserRouter } from 'react-router-dom';
import { RegisterPage } from 'pages/auth/register-page';
import { PrivateWrapper } from 'features/auth/components/private-wrapper';
import { LoginPage } from 'pages/auth/login-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateWrapper>
        <div>
          <h1>Я - главная страница</h1>
        </div>
      </PrivateWrapper>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
