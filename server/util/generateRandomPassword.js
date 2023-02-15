const generateRandomPassword = () => {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*`;
  let password = '';
  while (password.length < 8) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }
  console.log(password);
  return password;
};

module.exports = {
  generateRandomPassword,
};
