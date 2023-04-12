import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterUserRequest } from 'entities/auth/types/register-user-request';

import { useRegisterUserMutation } from 'entities/auth/hooks/use-register-user-mutation';
import { setToken } from 'entities/auth/model/local-storage';
import { useAuthStore } from 'entities/auth/model/store';
import { mainSocket } from '../../../../entities/main-socket/main-socket';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const { handleSubmit, register: registerField } =
    useForm<RegisterUserRequest>();

  const { registerUserMutate, registerUserIsError, registerUserErrorData } =
    useRegisterUserMutation((currentUser) => {
      if (currentUser) {
        setToken(currentUser);
        setCurrentUser(currentUser);
        mainSocket.setup(currentUser);

        navigate('/');
      }
    });

  const onSubmit = handleSubmit((data) => registerUserMutate(data));

  return (
    <div className="form-container">
      <div className="login-header">Register to Trello</div>
      <div className="errors">
        {registerUserIsError &&
          registerUserErrorData &&
          registerUserErrorData.errors.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
      </div>

      <form onSubmit={onSubmit}>
        <input
          {...registerField('email')}
          type="email"
          placeholder="Email"
          className="login-input"
        />
        <input
          {...registerField('username')}
          placeholder="Username"
          className="login-input"
        />
        <input
          {...registerField('password')}
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-submit-button">
          Register
        </button>
      </form>

      <div className="bottom-form-links">
        <Link to="/login" className="register-link">
          Sign in
        </Link>
      </div>
    </div>
  );
};
