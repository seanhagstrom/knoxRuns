import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Activities() {
  return (
    <div>
      <h1>Activities</h1>
      <Link to='1'>
        <p>This is an activity</p>
      </Link>
      <Outlet />
    </div>
  );
}

export default Activities;
