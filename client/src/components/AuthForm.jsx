import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import history from 'history/browser';
import { authenticateUser } from '../api/auth';

const URL = `http://www.strava.com/oauth/authorize?client_id=73695&response_type=code&redirect_uri=http://localhost:3000/auth/exchange_token/1&approval_prompt=force&scope=read_all,activity:read_all`;

const AuthForm = () => {
  let location = useLocation();
  let navigate = useNavigate();

  console.log('This is my local: ', location.pathname);
  // let params = new URLSearchParams(location.search);
  // let code = params.get('code');
  // console.log(code);

  // useEffect(() => {
  //   if (code) {
  //     (async () => {
  //       const lotsOfData = await stravaAuth(code);
  //       console.log(lotsOfData);
  //     })();
  //   }
  // }, [code]);
  let formname = location.pathname === '/login' ? 'login' : 'signup';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;

      const data = await authenticateUser({ email, password, formname });
      console.log(data);
      if (data.is_verified) {
        // changed from data.token
        navigate('/me');
      } else if (!data.is_verified) {
        navigate('/next-steps');
      } else {
        console.log('add error component');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const buttonContent = formname === 'login' ? 'Log In' : 'Sign Up';

  return (
    <div>
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
