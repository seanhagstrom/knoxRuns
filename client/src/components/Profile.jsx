import React, { useState, useEffect } from 'react';
import { getMe } from '../api/auth';

function Profile() {
  const [isloading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const { email, profile_image, firstname, lastname } = user;

  useEffect(() => {
    (async () => {
      const data = await getMe();
      setUser(data);
      setIsLoading(false);
    })();
  }, []);
  console.log(isloading);
  console.log(user);
  return (
    <>
      {isloading ? (
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
