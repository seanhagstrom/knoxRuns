const client = require('./client');

async function createMap({
  start_lat,
  start_lng,
  end_lat,
  end_lng,
  polyline,
  summary_polyline,
  activity_id,
}) {
  try {
    const {
      rows: [map],
    } = await client.query(
      `
    INSERT INTO maps(start_lat, start_lng, end_lat, end_lng, polyline, summary_polyline, activity_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
      [
        start_lat,
        start_lng,
        end_lat,
        end_lng,
        polyline,
        summary_polyline,
        activity_id,
      ]
    );

    return map;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { createMap };
