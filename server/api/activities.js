const router = require('express').Router();
const axios = require('axios');
const { getActivitiesByUserId } = require('../db');
const sampleActivities = require('../../resources/sample-activities.json');
const STRAVA_ACTIVITIES_URL =
  'https://www.strava.com/api/v3/athlete/activities';

// GET: api/activities
router.get('/', async (req, res, next) => {
  try {
    const {
      user: { user_id },
    } = req;

    /***  initially needed to get real activity data ***/
    /*
    const { data: stravaActivities } = await axios.get(STRAVA_ACTIVITIES_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    for (const activity of stravaActivities) {
      const { id, name, type, sport_type, description } = activity;

      const strava_activity_id = id.toString();
      console.log({
        user_id,
        strava_activity_id,
        name,
        type,
        sport_type,
        description,
      });
      await createActivity({
        user_id,
        strava_activity_id,
        name,
        type,
        sport_type,
        description,
      });
    }
    */

    const activities = await getActivitiesByUserId({ user_id });
    res.send(activities).status(200);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
