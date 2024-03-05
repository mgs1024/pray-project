import {useContext, useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Modal from 'react-modal';
import {AppContext} from '../../App';

const TourMap = () => {
  const coordinate = useContext(AppContext);
  const ref = useRef(null);
  const [marker, setMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  let mapLong = 126.978;
  let mapLat = 37.5665;
  let csNm = '';
  const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

  if (
    location.state &&
    location.state.mapLong &&
    location.state.mapLat &&
    location.state.csNm
  ) {
    mapLong = location.state.mapLong;
    mapLat = location.state.mapLat;
    csNm = location.state.csNm;
  }
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      const mapOptions = {
        center: {lat: parseFloat(mapLat), lng: parseFloat(mapLong)},
        zoom: 16,
      };

      const map = new window.google.maps.Map(ref.current, mapOptions);

      const pin = new window.google.maps.Marker({
        position: {lat: parseFloat(mapLat), lng: parseFloat(mapLong)},
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const openModal = () => {
    console.log('open');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      width: '300px',
      height: '300px',
      margin: 'auto',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '20px',
    },
  };
  console.log(coordinate);

  return (
    <div>
      <h1>TourMap</h1>
      <div ref={ref} style={{height: '400px', width: '100%'}}></div>
      <div>
        <ul className={'tour'}>
          <li>{location.state.csNm}</li>
          <li>{location.state.addr}</li>
          <li style={{paddingTop: '20px'}}>
            <button onClick={openModal}>경로 안내</button>
          </li>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyle}
            appElement={document.getElementById('root') || undefined}>
            <h1 style={{textAlign: 'center'}}>경로 안내</h1>
            <ul style={{listStyleType: 'none'}} className={'tourMap'}>
              <li>현재위치 -> {location.state.csNm}</li>
              <li>충전소 -> {location.state.csNm}</li>
              <li style={{textAlign: 'center', border: 'none'}}>
                <button onClick={closeModal}>닫기</button>
              </li>
            </ul>
          </Modal>
        </ul>
      </div>
    </div>
  );
};

export default TourMap;
