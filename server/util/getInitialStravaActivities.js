const axios = require('axios');
const { addInitialActivitiesToDb } = require('./addInitialActivitiesToDb');
const STRAVA_ACTIVITIES_URL =
  'https://www.strava.com/api/v3/athlete/activities';

const getInititialStravaActivities = async ({ access_token, user_id }) => {
  try {
    const { data: stravaActivities } = await axios.get(STRAVA_ACTIVITIES_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    await addInitialActivitiesToDb(user_id, stravaActivities);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getInititialStravaActivities };
