import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Activities() {
  const activities = useSelector((state) => state.activities);
  console.log(activities);
  return (
    <div>
      {activities.length ? (
        activities.map((activity, index) => (
          <div key={activity.id}>
            <p>{activity.testDescription}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
      <h1>Activities</h1>
      <Link to='1'>
        <p>This is an activity</p>
      </Link>
      <Outlet />
    </div>
  );
}

export default Activities;
