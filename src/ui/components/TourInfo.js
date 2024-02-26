import {useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const TourInfo = () => {
  const location = useLocation();
  const contentId = location.state.contentId;
  const [data, setData] = useState();
  const [image, setImage] = useState();
  const searchKey = 'detailCommon1';
  const serviceKey =
    '1s%2F8YBFyhR5rW1nadGx2niB4GW7BohRLFNbFjtF8S4%2FtnV0tAeCBed6AYO%2Fjq0fyi7Ceq933829psbDswpP5Jw%3D%3D';

  useEffect(() => {
    const getData = async () => {
      try {
        axios
          .all(
            // eslint-disable-next-line no-template-curly-in-string
            [
              axios.get(
                `http://apis.data.go.kr/B551011/KorService1/${searchKey}?serviceKey=${serviceKey}&_type=json&contentId=${contentId}&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&MobileOS=ETC&MobileApp=AppTest`,
              ),
              axios.get(
                `http://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=${serviceKey}&_type=json&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&imageYN=Y&subImageYN=Y`,
              ),
            ],
          )
          .then(
            axios.spread((response1, response2) => {
              setData(response1.data.response.body.items.item);
              setImage(response2.data.response.body.items.item);
            }),
          );
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  console.log(data);
  console.log(image);
  return (
    <div>
      <h1>Info</h1>
      {data &&
        data.map(item => (
          <table className={'info'} key={item.contentid}>
            <thead></thead>
            <tbody>
              <tr>
                <td>장소</td>
                <td>{item.title}</td>
              </tr>
              <tr>
                <td>도로명</td>
                <td>{item.addr1}</td>
              </tr>
              <tr>
                <td>개요</td>
                <td>
                  {item.overview.split('<br>').map(text => (
                    <span>
                      {text}
                      <br />
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      {image &&
        image.map(image => (
          <div className={'imgBox'} key={image.serialnum}>
            <img src={image.originimgurl} />
          </div>
        ))}
    </div>
  );
};

export default TourInfo;
