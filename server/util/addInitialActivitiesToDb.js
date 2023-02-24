const { createActivity } = require('../db');
const { addMetricsToActivity } = require('../db/activity_metrics');
const { createMap } = require('../db/maps');
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
        start_latlng,
        end_latlng,
        map: { polyline, summary_polyline },
      } = activity;

      const [start_lat, start_lng] = start_latlng;
      const [end_lat, end_lng] = end_latlng;

      const strava_activity_id = id.toString();

      const activityCreated = await createActivity({
        user_id,
        strava_activity_id,
        name,
        type,
        sport_type,
        description,
      });

      const { activity_id } = activityCreated;

      const metricCreated = await createMetric({
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

      const { metric_id } = metricCreated;

      await addMetricsToActivity({ activity_id, metric_id });

      if (start_latlng || end_latlng || polyline || summary_polyline) {
        await createMap({
          start_lat,
          start_lng,
          end_lat,
          end_lng,
          polyline,
          summary_polyline,
          activity_id,
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { addInitialActivitiesToDb };
