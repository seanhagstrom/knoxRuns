module.exports = {
  ...require('./attachUserToRequest'),
  ...require('./authenticateUser'),
  ...require('./buildSetString'),
  ...require('./generateRandomPassword'),
  ...require('./sendEmail'),
  ...require('./accessTokenExpired'),
  ...require('./getInitialStravaActivities'),
  ...require('./addInitialActivitiesToDb'),
};
