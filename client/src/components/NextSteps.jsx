import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { verifyUser } from '../api/auth';

function NextSteps() {
  const [user, setUser] = useState({});
  const { verification_string } = useParams();
  const [isloading, setIsLoading] = useState(true);
  // const [isVerified, setIsVerified] = useState(user.is_verified);
  const [stravaUrl, setStravaUrl] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!verification_string) {
      setTimeout(() => {
        navigate('/me');
      }, 5000);
    } else {
      const verify = async () => {
        const verifiedUser = await verifyUser({ verification_string });
        console.log(verifiedUser);
        setUser(verifiedUser);
        setIsLoading(false);
        setStravaUrl(
          `http://www.strava.com/oauth/authorize?client_id=73695&response_type=code&redirect_uri=http://localhost:3000/auth/exchange_token/${verifiedUser.user_id}&approval_prompt=force&scope=read_all,activity:read_all`
        );
      };
      verify();
    }
  }, []);

  return (
    <div>
      <h1>NextSteps</h1>
      {isloading && <p>Loading.......</p>}
      {!isloading && verification_string ? (
        stravaUrl ? (
          <p>
            Thank you for verifying your email address. There's just one step
            left to see your activity data! Click <a href={stravaUrl}>here</a>{' '}
            to authorize KnoxRuns to use access your Strava data!
          </p>
        ) : (
          <p>
            Thank you for verifying your email address. Please wait while we
            update your profile.
          </p>
        )
      ) : (
        <p>Thanks for signing up! Check your email to verify your account!</p>
      )}
    </div>
  );
}

export default NextSteps;
