const { VITE_STRAVA_CLIENT_ID } = import.meta.env;
const { VITE_STRAVA_CLIENT_SECRET } = import.meta.env;

export const loginUser = async ({ username, password }) => {
  console.log('in src/api/auth loginUser');
  try {
    const response = await fetch(`auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (data.token) {
      // Temporary to get auth working.
      window.localStorage.setItem('token', data.token);
      return data;
    }
    return;
  } catch (error) {
    console.error(error);
  }
};

// I may move this to the backend for security purposes.
export const stravaAuth = async (code) => {
  console.log({
    client_id: VITE_STRAVA_CLIENT_ID,
    client_secret: VITE_STRAVA_CLIENT_SECRET,
  });
  try {
    const oauthURL = `https://www.strava.com/api/v3/oauth/token`;

    const response = await fetch(oauthURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: VITE_STRAVA_CLIENT_ID,
        client_secret: VITE_STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
