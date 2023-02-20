import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Activity from './Activity';

function Activities() {
  const activities = useSelector((state) => state.activities);
  console.log(activities);
  return (
    <>
      {activities.length ? (
        <section>
          <h1>Activities</h1>
          {activities.map((activity, index) => (
            <Link key={activity.id} to={`/activities/${activity.id}`}>
              <Activity singleActivity={activity} />
            </Link>
          ))}
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Activities;
