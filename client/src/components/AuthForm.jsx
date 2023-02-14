import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import history from 'history/browser';
import { loginUser } from '../api/auth';

const URL = `http://www.strava.com/oauth/authorize?client_id=73695&response_type=code&redirect_uri=http://localhost:3000/auth/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;

const AuthForm = () => {
  let location = useLocation();

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
  let formname = location.pathname === '/login' ? 'login' : 'register';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formname === 'login') {
        const username = event.target.username.value;
        const password = event.target.password.value;

        const data = await loginUser({ username, password, formname });
        if (data.token) {
          history.push(URL);
        }
      } else {
        console.log('something else here soon!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const buttonContent =
    formname === 'login' ? 'Log In' : 'Complete Registration';

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formname === 'login' ? (
          <>
            <div>
              <label htmlFor='username'>Username</label>
              <input type='text' name='username' />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input type='text' name='password' />
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor='username'>Email</label>
              <input type='text' name='email' />
            </div>
            {/* <div>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' />
        </div> */}
          </>
        )}
        <button>{buttonContent}</button>
      </form>
    </div>
  );
};

export default AuthForm;
