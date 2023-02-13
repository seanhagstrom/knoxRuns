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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
