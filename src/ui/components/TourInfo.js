import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TourInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentId = location.state.contentId;
  const mapLong = location.state.mapLong;
  const mapLat = location.state.mapLat;
  const pattern = /[0-9a-zA-Z]/;
  const regex = /[^0-9]/g;
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [info, setInfo] = useState();
  const [url, setUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isUrl, setIsUrl] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
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
              axios.get(
                `http://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${serviceKey}&_type=json&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&contentTypeId=12`,
              ),
            ],
          )
          .then(
            axios.spread((response1, response2, response3) => {
              const res1 = response1.data.response.body.items.item[0];
              const res2 = response2.data.response.body.items.item;
              const res3 = response3.data.response.body.items.item[0];
              setData(res1);
              setImage(res2);
              setInfo(res3);

              if (
                pattern.test(res1.homepage) &&
                res1.homepage.indexOf('.') !== -1
              ) {
                getUrl(res1.homepage);
              }

              hpFormat(res3.infocenter.replace(regex, ''));
            }),
          );
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data);
  console.log(image);
  console.log(info);

  const onPopup = () => {
    if (isUrl) {
      window.open(url, '_blank', 'noopener, noreferrer');
    }
  };

  const getUrl = link => {
    link = link.replace(/\\/g, '');

    if (link.indexOf('//') !== -1) {
      link = link.split('//')[1];
    }

    if (link.indexOf('"') !== -1) {
      setUrl('http://' + link.split('"')[0]);
    } else {
      setUrl('http://' + link);
    }

    setIsUrl(true);
  };

  const openModal = () => {
    if (isPhone) {
      setIsOpen(true);
    }
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
      height: '100px',
      margin: 'auto',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '20px',
    },
  };

  const hpFormat = hp => {
    if (hp.substr(0, 2) === '02') {
      if (hp.length === 10) {
        setPhoneNumber(
          hp.substr(0, 2) + '-' + hp.substr(2, 4) + '-' + hp.substr(6, 4),
        );
      } else {
        setPhoneNumber(
          hp.substr(0, 2) + '-' + hp.substr(2, 3) + '-' + hp.substr(5, 4),
        );
      }
    } else {
      if (hp.length === 11) {
        setPhoneNumber(
          hp.substr(0, 3) + '-' + hp.substr(3, 4) + '-' + hp.substr(7, 4),
        );
      } else if (hp.length === 12) {
        setPhoneNumber(
          hp.substr(0, 4) + '-' + hp.substr(4, 4) + '-' + hp.substr(8, 4),
        );
      } else if (hp.length === 8) {
        setPhoneNumber(hp.substr(0, 4) + '-' + hp.substr(4, 4));
      } else {
        setPhoneNumber(
          hp.substr(0, 3) + '-' + hp.substr(2, 3) + '-' + hp.substr(5, 4),
        );
      }
    }

    if (pattern.test(hp)) {
      setIsPhone(true);
    }
  };

  const onClickMap = () => {
    navigate('/tourMap', {
      state: {
        mapLong: mapLong,
        mapLat: mapLat,
        csNm: data.title,
        addr: data.addr1,
      },
    });
  };

  const onClickCall = () => {
    if (window.confirm(`${phoneNumber}로 전화를 거시겠습니까?`)) {
      document.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <div>
      <h1>Info</h1>
      <table className={'info'}>
        <thead></thead>
        <tbody>
          <tr>
            <td>장소</td>
            <td>{data.title}</td>
          </tr>
          <tr>
            <td>도로명</td>
            <td>{data.addr1}</td>
          </tr>
          <tr>
            <td>개요</td>
            <td>
              <span dangerouslySetInnerHTML={{__html: data.overview}} />
            </td>
          </tr>
        </tbody>
      </table>
      <ul className={'navbar_ul'}>
        <li onClick={onPopup}>홈페이지 {isUrl ? '바로가기' : '없음'}</li>
        <li onClick={openModal}>전화번호 {isPhone ? '안내' : '없음'}</li>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyle}
          appElement={document.getElementById('root') || undefined}>
          <h1 style={{textAlign: 'center'}}>{phoneNumber}</h1>
          <ul className={'call'}>
            <li onClick={onClickCall}>전화걸기</li>
            <li onClick={closeModal}>닫기</li>
          </ul>
        </Modal>
        <li onClick={onClickMap}>지도</li>
      </ul>
      {image &&
        image.map(image => (
          <div className={'imgBox'} key={image.serialnum}>
            <img src={image.originimgurl} alt={'tour'} />
          </div>
        ))}
      <div className={'emptyBox'} />
    </div>
  );
};

export default TourInfo;
