const { VITE_STRAVA_CLIENT_ID } = import.meta.env;
const { VITE_STRAVA_CLIENT_SECRET } = import.meta.env;

export const loginUser = async ({ username, password, formname: name }) => {
  console.log(`in src/api/auth loginUser with formname: ${name}`);
  try {
    const response = await fetch(`auth/${name}`, {
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
      localStorage.setItem('token', data.token);
      return data;
    }
    return;
  } catch (error) {
    console.error(error);
  }
};
