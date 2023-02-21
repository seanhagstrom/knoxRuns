import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Activity({ singleActivity }) {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(singleActivity);

  const activityToSet = useSelector((state) =>
    state.activities.data.find((search) => search.activity_id === +activityId)
  );

  useEffect(() => {
    if (activityId) {
      setActivity(activityToSet);
    }
  }, [activity]);

  return (
    <>
      {activity ? (
        <article key={activity.activity_id}>
          <p>This is the activity_id: {activity.activity_id}</p>
        </article>
      ) : (
        <div>Can't find that activity</div>
      )}
    </>
  );
}

export default Activity;
