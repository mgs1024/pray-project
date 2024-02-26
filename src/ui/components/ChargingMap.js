import {useState, useRef, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const ChargingMap = () => {
  const ref = useRef(null);
  //const [mapLong, setMapLong] = useState(null);
  //const [mapLat, setMapLat] = useState(null);
  const [marker, setMarker] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;
  
    window.initMap = () => {
      const mapOptions = {
        center: { lat: parseFloat(location.state.mapLat), lng: parseFloat(location.state.mapLong) },
        zoom: 16,
      };
  
      const map = new window.google.maps.Map(ref.current, mapOptions);

      const pin = new window.google.maps.Marker({
        position: { lat: parseFloat(location.state.mapLat), lng: parseFloat(location.state.mapLong) },
        map: map,
        title: '요기요',
      });

      setMarker(pin);

    };
  
    document.head.appendChild(script);
  
    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, [location.state]);
  

  const onClick = e => {
    const long = e.currentTarget.getAttribute('data-long');
    const lat = e.currentTarget.getAttribute('data-lat');
    //setMapLong(long);
    //setMapLat(lat);
    console.log(long, lat);
    navigate('/tour', {state: {tourLong: long, tourLat: lat}});
  }; 

  return (
    <div>
      <h1>지도</h1>
      <button data-long={location.state.mapLong} data-lat={location.state.mapLat} onClick={onClick}>
        주변추천관광지
      </button>
      <div
        ref={ref}
        style={{ height: '400px', width: '100%' }}
      ></div>
    </div>
  );
};

export default ChargingMap;
