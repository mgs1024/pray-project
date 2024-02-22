import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const TourList = () => {
  const location = useLocation();
  const long = location.state.tourLong;
  const lat = location.state.tourLat;
  const [data, setData] = useState();
  const searchKey = "locationBasedList1";
  const serviceKey =
    "1s%2F8YBFyhR5rW1nadGx2niB4GW7BohRLFNbFjtF8S4%2FtnV0tAeCBed6AYO%2Fjq0fyi7Ceq933829psbDswpP5Jw%3D%3D";

  axios
    .get(
      // eslint-disable-next-line no-template-curly-in-string
      `http://apis.data.go.kr/B551011/KorService1/${searchKey}?serviceKey=${serviceKey}&_type=json&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=E&mapX=${long}&mapY=${lat}&radius=1000&listYN=Y&contentTypeId=12&contentTypeId=14`,
    )
    .then((response) => {
      setData(response.data.response.body.items.item);
    });

  return (
    <div>
      <h1>Tour</h1>
      {data &&
        data.map((item, index) => (
          <ul className={"tour"} id={index} key={index}>
            <li>{item.title}</li>
            <li>{item.addr1}</li>
            <li>{item.dist.substring(0, 3)}m</li>
          </ul>
        ))}
    </div>
  );
};

export default TourList;
