const { createActivity } = require('../db');
const { createMetric } = require('../db/metrics');

const addInitialActivitiesToDb = async (user_id, activities) => {
  try {
    for (const activity of activities) {
      const {
        id,
        name,
        type,
        sport_type,
        description,
        elapsed_time,
        moving_time,
        start_date,
        distance,
        total_elevation_gain,
        average_speed,
        max_speed,
        average_cadence,
        has_heartrate,
        average_heartrate,
        max_heartrate,
        elev_high,
        elev_low,
        calories,
      } = activity;

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

      await createMetric({
        elapsed_time,
        moving_time,
        start_date,
        distance,
        total_elevation_gain,
        average_speed,
        max_speed,
        average_cadence,
        has_heartrate,
        average_heartrate,
        max_heartrate,
        elev_high,
        elev_low,
        calories,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { addInitialActivitiesToDb };
