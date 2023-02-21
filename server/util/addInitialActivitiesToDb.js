const { createActivity } = require('../db');

const addInitialActivitiesToDb = async (user_id, activities) => {
  try {
    for (const activity of activities) {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { addInitialActivitiesToDb };
