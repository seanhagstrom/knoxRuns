import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Map from './Map';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import polyUtil from 'polyline-encoded';

function Activity({ singleActivity }) {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(singleActivity);

  const activityToSet = useSelector((state) =>
    state.activities.data.find((search) => search.activity_id === +activityId)
  );

  const polyDecoded = polyUtil.decode(activity.summary_polyline);

  useEffect(() => {
    if (activityId) {
      setActivity(activityToSet);
    }
  }, [activity]);

  return (
    <>
      {activity ? (
        <article key={activity.activity_id}>
          {/* <p>This is the activity_id: {activity.activity_id}</p> */}
          <div
            id={'map' + activity.activity_id}
            // className='map'
            key={activity.activity_id}
          >
            <MapContainer
              center={[activity.start_lat, activity.start_lng]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: 500 + 'px', width: 500 + 'px' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={[activity.start_lat, activity.start_lng]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <Polyline
                pathOptions={{ color: 'purple' }}
                positions={polyDecoded}
              />
            </MapContainer>
          </div>
        </article>
      ) : (
        <div>Can't find that activity</div>
      )}
    </>
  );
}

export default Activity;
