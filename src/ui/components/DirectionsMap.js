import UseCurrentLocation from '../hooks/useCurrentLocation';

const DirectionsMap = () => {
  UseCurrentLocation();
  return (
    <div>
      <h1>DirectionsMap</h1>
    </div>
  );
};

export default DirectionsMap;
