import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, currentUser } from '../store/authSlice';

const AuthForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  let location = useLocation();
  let navigate = useNavigate();

  let formname = location.pathname === '/login' ? 'login' : 'signup';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;

      dispatch(authenticateUser({ email, password, formname }));

      if (user.user_id && user.is_verified) {
        navigate('/me');
      } else if (user.user_id && !user.is_verified) {
        navigate('/next-steps');
      } else {
        console.log('AuthForm: add error and loading component');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const buttonContent = formname === 'login' ? 'Log In' : 'Sign Up';

  return (
    <div>
      <h1>Some photo here or carousel</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' />
          {/* At some point add a password confirmation input */}
        </div>
        <button>{buttonContent}</button>
      </form>
    </div>
  );
};

export default AuthForm;
