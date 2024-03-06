import useCurrentLocation from '../hooks/useCurrentLocation';
import {useContext, useEffect, useRef, useState} from 'react';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from '@react-google-maps/api';
import {AppContext} from '../../App';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1,
  maximumAge: 1000 * 3600 * 24,
};

const Directions = props => {
  const [directions, setDirections] = useState();
  const {origin, destination} = props;
  const count = useRef(0);
  const options = {
    polylineOptions: {
      strokeColor: 'red',
      strokeWeight: 6,
      strokeOpacity: 0.8,
    },
  };
  console.log(props);
  useEffect(() => {
    count.current = 0;
  }, []);

  const directionsCallback = (result, status) => {
    console.log(result, status);
    if (status === 'OK' && count.current === 0) {
      count.current += 1;
      setDirections(result);
    }
  };

  return (
    <div>
      <DirectionsService
        options={{origin, destination, travelMode: 'TRANSIT'}}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={options} />
    </div>
  );
};

const DirectionsMap = () => {
  const {location, error} = useCurrentLocation(geolocationOptions);
  const coordinate = useContext(AppContext);
  let startPoint = {};
  const endPoint = useContext(AppContext).tour;
  if (coordinate.flag === 1) {
    startPoint = location;
  } else {
    startPoint = coordinate.chargingStation;
  }

  return (
    <div>
      <h1>DirectionsMap</h1>
      <GoogleMap
        mapContainerStyle={{height: '400px', width: '100%'}}
        zoom={16}
        center={startPoint ? {lat: 37.5665, lng: 126.978} : undefined}>
        <Directions origin={startPoint} destination={endPoint}></Directions>
      </GoogleMap>
    </div>
  );
};

export default DirectionsMap;
