const client = require('./client');

async function createActivity({
  user_id,
  strava_activity_id,
  name,
  type,
  sport_type,
  description,
}) {
  try {
    strava_activity_id = strava_activity_id.toString();
    const {
      rows: [activity],
    } = await client.query(
      `
    INSERT INTO activities( user_id, strava_activity_id, name, type, sport_type, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (strava_activity_id) DO NOTHING
    RETURNING *;
    `,
      [user_id, strava_activity_id, name, type, sport_type, description]
    );

    return activity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getActivitiesByUserId = async ({ user_id }) => {
  try {
    const { rows: activities } = await client.query(
      `
    SELECT * FROM activities
    WHERE user_id = $1
    `,
      [user_id]
    );

    return activities;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getSummaryActivitiesByUserId = async ({ user_id }) => {
  try {
    const { rows: summaryActivities } = await client.query(
      `
      SELECT activities.*, metrics.elapsed_time, metrics.moving_time, metrics.start_date, metrics.distance, metrics.total_elevation_gain, metrics.average_speed, metrics.max_speed, metrics.average_cadence, metrics.has_heartrate, metrics.average_heartrate, metrics.max_heartrate, metrics.elev_high, metrics.elev_low, metrics.calories, maps.start_lat, maps.start_lng, maps.end_lat, maps.end_lng, maps.summary_polyline
      FROM activities
      INNER JOIN activity_metrics ON activities.activity_id = activity_metrics.activity_id
      INNER JOIN metrics ON activity_metrics.metric_id = metrics.metric_id
      INNER JOIN maps ON maps.activity_id = activities.activity_id
      WHERE activities.user_id = $1;
    `,
      [user_id]
    );

    return summaryActivities;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createActivity,
  getActivitiesByUserId,
  getSummaryActivitiesByUserId,
};
