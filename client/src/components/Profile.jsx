import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);

  const { email, profile_image, firstname, lastname } = user;

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
              <p>Add Summary Activities here.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
