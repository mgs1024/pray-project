import axios from 'axios';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const TourList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const long = location.state.tourLong;
  const lat = location.state.tourLat;
  const [data, setData] = useState();
  const searchKey = 'locationBasedList1';
  const serviceKey =
    '1s%2F8YBFyhR5rW1nadGx2niB4GW7BohRLFNbFjtF8S4%2FtnV0tAeCBed6AYO%2Fjq0fyi7Ceq933829psbDswpP5Jw%3D%3D';

  useEffect(() => {
    const getData = async () => {
      try {
        axios
          .get(
            // eslint-disable-next-line no-template-curly-in-string
            `http://apis.data.go.kr/B551011/KorService1/${searchKey}?serviceKey=${serviceKey}&_type=json&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=E&mapX=${long}&mapY=${lat}&radius=1000&listYN=Y&contentTypeId=12`,
          )
          .then(response => {
            setData(response.data.response.body.items.item);
          });
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const onClick = async item => {
    navigate('/info', {state: {contentId: item.contentid}});
  };

  return (
    <div>
      <h1>Tour</h1>
      {data &&
        data.map(item => (
          <ul
            className={'tour'}
            key={item.contentid}
            onClick={() => onClick(item)}>
            <li>{item.title}</li>
            <li>{item.addr1}</li>
            <li>{item.dist.substring(0, 3)}m</li>
          </ul>
        ))}
    </div>
  );
};

export default TourList;
