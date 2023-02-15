import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import history from 'history/browser';
import { loginUser } from '../api/auth';

const URL = `http://www.strava.com/oauth/authorize?client_id=73695&response_type=code&redirect_uri=http://localhost:3000/auth/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;

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
      if (formname === 'login') {
        const email = event.target.email.value;
        const password = event.target.password.value;

        const data = await loginUser({ email, password, formname });
        if (data.token) {
          // history.push(URL);
          navigate('/me');
        }
      } else {
        console.log('something else here soon!');
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
