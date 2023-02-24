const client = require('./client');

async function createMetric({
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
}) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    INSERT INTO metrics( elapsed_time,
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
      calories)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `,
      [
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
      ]
    );

    return activity;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { createMetric };
