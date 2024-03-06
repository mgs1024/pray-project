import {useEffect, useState} from 'react';

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const handleSuccess = pos => {
    const lat = Number(pos.coords.latitude.toFixed(6));
    const lng = Number(pos.coords.longitude.toFixed(6));

    setLocation({lat, lng});
  };

  const handleError = error => {
    setError(error.message);
  };

  useEffect(() => {
    const {geolocation} = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  console.log(location);
  return {location, error};
};

export default useCurrentLocation;
