const client = require('./client');

async function addMetricsToActivity({ activity_id, metric_id }) {
  try {
    const {
      rows: [activityMetric],
    } = await client.query(
      `
    INSERT INTO activity_metrics( activity_id, metric_id )
    VALUES ($1, $2)
    RETURNING *;
    `,
      [activity_id, metric_id]
    );

    return activityMetric;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { addMetricsToActivity };
