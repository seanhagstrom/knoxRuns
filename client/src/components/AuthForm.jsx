import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import history from 'history/browser';
import { loginUser, stravaAuth } from '../api/auth';

const URL = `http://www.strava.com/oauth/authorize?client_id=73695&response_type=code&redirect_uri=http://localhost:5173/login&approval_prompt=force&scope=read_all,activity:read_all`;

const AuthForm = () => {
  let location = useLocation();
  console.log('This is my local: ', location);
  let params = new URLSearchParams(location.search);
  let code = params.get('code');
  console.log(code);

  useEffect(() => {
    if (code) {
      (async () => {
        const lotsOfData = await stravaAuth(code);
        console.log(lotsOfData);
      })();
    }
  }, [code]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const username = event.target.username.value;
      const password = event.target.password.value;
      await loginUser({ username, password });
      history.push(URL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' />
        </div>
        <button>login/signup</button>
      </form>
    </div>
  );
};

export default AuthForm;
