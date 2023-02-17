module.exports = {
  ...require('./attachUserToRequest'),
  ...require('./authenticateUser'),
  ...require('./buildSetString'),
  ...require('./generateRandomPassword'),
  ...require('./sendEmail'),
};
