import React from 'react';
import { NavLink } from 'react-router-dom';
import history from 'history/browser';

function Welcome() {
  const URL =
    'http://www.strava.com/oauth/authorize?client_id=73695&response_type=code&redirect_uri=http://localhost:3000/auth/exchange_token&approval_prompt=force&scope=read_all,activity:read_all';
  return (
    <div>
      <h1>This is the Welcome View</h1>

      <div>
        <p>Already have an account?</p>
        <NavLink to='login'>
          <button>Log In</button>
        </NavLink>
      </div>
      <div>
        <p>New to KnoxRuns? Sign up.</p>

        <button
          onClick={() => {
            history.push(URL);
          }}
        >
          Sign Up with Strava
        </button>
      </div>
    </div>
  );
}

export default Welcome;
