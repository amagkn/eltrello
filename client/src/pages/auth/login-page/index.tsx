import { Link } from 'react-router-dom';
import logo from 'shared/assets/trello-logo.svg';
import { LoginForm } from 'features/auth/components/login-form';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <Link to="/">
        <img src={logo} alt="logo" className="trello-main-logo" />
      </Link>

      <LoginForm />
    </div>
  );
};
