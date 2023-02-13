import React from 'react';
import { loginUser } from '../api/auth';
const AuthForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await loginUser({ username, password });
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
