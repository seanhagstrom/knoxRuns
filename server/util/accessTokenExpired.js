const accessTokenExpired = (expires_at) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  if (expires_at < currentTimeInSeconds) {
    console.log(
      `the accessToken expired at ${expires_at} and the current time is: ${currentTimeInSeconds}`
    );
    return true;
  }
  console.log(
    `the accessToken is still good and expires in ${
      (expires_at - currentTimeInSeconds) / 60
    } minutes `
  );
  return false;
};

module.exports = { accessTokenExpired };
