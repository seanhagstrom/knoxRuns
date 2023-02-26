import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Activity from './Activity';
import { setSummaryActivities } from '../store/activitiesSlice';

function Activities() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.data);
  const status = useSelector((state) => state.activities.status);
  console.log({ activities });

  useEffect(() => {
    if (status === 'idle') dispatch(setSummaryActivities());
  }, [status, dispatch]);
  return (
    <>
      {activities.length ? (
        <section>
          <h1>Activities</h1>
          {activities.map((activity, index) => (
            <Link
              key={activity.activity_id}
              to={`/activities/${activity.activity_id}`}
            >
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
