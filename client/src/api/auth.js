const { VITE_STRAVA_CLIENT_ID } = import.meta.env;
const { VITE_STRAVA_CLIENT_SECRET } = import.meta.env;
const AUTH_URL = 'http://localhost:3000';

export const authenticateUser = async ({ email, password, formname: name }) => {
  console.log(`in src/api/auth authenticateUser with formname: ${name}`);
  try {
    const response = await fetch(`auth/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      // Temporary to get auth working.
      localStorage.setItem('token', data.token);
      return await getMe();
    }
    return;
  } catch (error) {
    console.error(error);
  }
};
export const verifyUser = async ({ verification_string }) => {
  try {
    console.log('verification_string in verifyUser: ', verification_string);
    const response = await fetch(`${AUTH_URL}/auth/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        verification_string,
      }),
    });
    console.log('hit', response);
    const data = await response.json();
    console.log('hit', data);

    if (data.is_verified) {
      return data;
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async () => {
  try {
    const token = localStorage.token;

    if (!token) {
      return null;
    }
    const response = await fetch(`auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
