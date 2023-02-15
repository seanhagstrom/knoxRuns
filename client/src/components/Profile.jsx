import React, { useEffect } from 'react';
import { fakeAthleteSummaryData } from '../fakeAthleteData';

function Profile() {
  const {
    firstname,
    lastname,
    strava_id,
    strava_username,
    city,
    profile_image,
    state,
  } = fakeAthleteSummaryData;
  // console.log(user);
  return (
    <div>
      <h1>
        Hi, {firstname} {lastname}
      </h1>
      <img src={profile_image} />
      <p>Add Summary Activities here.</p>
    </div>
  );
}

export default Profile;
