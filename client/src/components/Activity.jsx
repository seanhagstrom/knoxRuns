import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Activity({ singleActivity = {} }) {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(singleActivity);

  const activityToSet = useSelector((state) =>
    state.activities.find((activity) => activity.id === +activityId)
  );

  useEffect(() => {
    if (activityId) {
      setActivity(activityToSet);
    }
  }, [activity]);

  return (
    <>
      {activity.id ? (
        <article key={activity.id}>
          <p>{activity.testDescription}</p>
        </article>
      ) : (
        <div>Can't find that activity</div>
      )}
    </>
  );
}

export default Activity;
