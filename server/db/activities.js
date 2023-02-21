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
    RETURNING user_id, strava_activity_id, name, type, sport_type, description;
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

module.exports = { createActivity, getActivitiesByUserId };
