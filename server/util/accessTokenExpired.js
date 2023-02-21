const accessTokenExpired = (expires_at) => {
  console.log(Date.now());
  if (expires_at < Date.now()) return true;
  return false;
};

module.exports = { accessTokenExpired };
