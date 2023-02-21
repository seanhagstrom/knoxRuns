import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentUser } from '../store/authSlice';

function Profile() {
  const user = useSelector(currentUser);
  const userStatus = useSelector((state) => state.user.status);

  const { user_id, email, profile_image, firstname, lastname, is_verified } =
    user;
  const stravaUrl = `http://www.strava.com/oauth/authorize?client_id=73695&response_type=code&redirect_uri=http://localhost:3000/auth/exchange_token/${user_id}&approval_prompt=force&scope=read_all,activity:read_all`;

  return (
    <>
      {userStatus === 'loading' ? (
        <div>
          <h1>Loading....</h1>
        </div>
      ) : (
        <>
          {user.firstname ? (
            <div>
              <h1>
                Hi, {firstname} {lastname}
              </h1>
              {profile_image ? (
                <img src={profile_image} />
              ) : (
                <img src={`default-user-img.png`} />
              )}

              <p>Add Summary Activities here.</p>
            </div>
          ) : (
            <div>
              <h1>Hi, {email}.</h1>
              <img src={`default-user-img.png`} />
              {is_verified ? (
                <p>
                  Thank you for verifying your email address. There's just one
                  step left to see your activity data! Click{' '}
                  <a href={stravaUrl}>here</a> to authorize KnoxRuns to use
                  access your Strava data!
                </p>
              ) : (
                <p>Please check your email to verify your account.</p>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
