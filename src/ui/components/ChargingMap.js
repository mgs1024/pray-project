import {useState, useRef, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const ChargingMap = () => {
  const ref = useRef(null);
  const [marker, setMarker] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  let mapLong = 126.9780;
  let mapLat = 37.5665;
  let csNm = '';
  const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

  
  useEffect(() => {
    if (location.state && location.state.mapLong && location.state.mapLat && location.state.csNm) {
      mapLong = location.state.mapLong;
      mapLat = location.state.mapLat;
      csNm = location.state.csNm;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;
    

    window.initMap = () => {

      const mapOptions = {
        center: { lat: parseFloat(mapLat), lng: parseFloat(mapLong) },
        zoom: 16,
      };
  
      const map = new window.google.maps.Map(ref.current, mapOptions);

      const pin = new window.google.maps.Marker({
        position: { lat: parseFloat(mapLat), lng: parseFloat(mapLong) },
        map: map,
        title: csNm,
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
    const long = mapLong;
    const lat = mapLat;
    // setMapLong(long);
    // setMapLat(lat);
    console.log(long, lat);
    navigate('/tour', {state: {tourLong: long, tourLat: lat}});
  }; 

  return (
    <div>
      <h1>지도</h1>
      <button onClick={onClick}>
        주변추천관광지
      </button>
      <div
        ref={ref}
        style={{ height: '400px', width: '100%' }}
      ></div>
      { location.state &&
        <div>
          <ul className={'tour'}>
              <li>{location.state.csNm}</li>
              <li>{location.state.addr}</li>
              <li>
                  {location.state.cpNm} :  
                  {location.state.cpStat === 1 ? " 충전가능" : location.state.cpStat === 2 ? " 충전중" : location.state.cpStat === 3 ? " 고장/점검" : location.state.cpStat === 4 ? " 통신장애" : " 통신미연결"}
              </li>
              <li>
                  {location.state.cpTp === 1 ? "B타입(5핀)" : location.state.cpTp === 2 ? "C타입(5핀)" : location.state.cpTp === 3 ?  "BC타입(5핀)" : location.state.cpTp === 4 ? "BC타입(7핀)" : location.state.cpTp === 5 ? "DC차데모" : location.state.cpTp === 6 ? "AC3상" : location.state.cpTp === 7 ? "DC콤보" : "DC차데모+DC콤보"}
              </li>
          </ul>
        </div>
       }
    </div>
  );
};

export default ChargingMap;
