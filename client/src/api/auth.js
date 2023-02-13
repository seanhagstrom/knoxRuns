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
