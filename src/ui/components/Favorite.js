import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Favorite = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/favorite');
        console.log(res.data);
        setList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const onClick = e => {
    const long = e.currentTarget.getAttribute('data-long');
    const lat = e.currentTarget.getAttribute('data-lat');
    const csNm = e.currentTarget.getAttribute('data-csnm');
    const addr = e.currentTarget.getAttribute('data-addr');
    const cpNm = e.currentTarget.getAttribute('data-cpnm');   
    const cpTp = e.currentTarget.getAttribute('data-cptp');
    navigate('/map', {
        state: {
          mapLong: long,
          mapLat: lat,
          csNm: csNm,
          addr: addr,
          cpNm: cpNm,
          cpTp: cpTp,
        },
      });
};

  const delClick = async item => {
    if (window.confirm('삭제 하시겠습니까?')) {
      axios.delete(`http://localhost:4000/favorite/` + item.id);
      setList(list.filter(p => p.id !== item.id));
    }
  };

  console.log(list);
  return (
    <>
      <h1>즐겨찾기</h1>
      {list &&
        list.map(item => (
          <table className={'fav'} key={item.id}>
            <thead></thead>
            <tbody>
              <tr>
                <td
                  data-long={item.longi} 
                  data-lat={item.lat}
                  data-csnm={item.csNm}
                  data-addr={item.addr}
                  data-cpnm={item.cpNm}
                  data-cptp={item.cpTp}
                  onClick={onClick}
                >
                  <ul style={{borderStyle: 'none'}}>
                    <li>{item.csNm}</li>
                    <li>{item.addr}</li>
                    <li>
                      {item.chargeTp === 1 ? "완속" : "급속"}
                    </li>
                    <li>
                        {item.cpTp === 1 ? "B타입(5핀)" : item.cpTp === 2 ? "C타입(5핀)" : item.cpTp === 3 ?  "BC타입(5핀)" : item.cpTp === 4 ? "BC타입(7핀)" : item.cpTp === 5 ? 
                        "DC차데모" : item.cpTp === 6 ? "AC3상" : item.cpTp === 7 ? "DC콤보" : item.cpTp === 8 ? "DC차데모+DC콤보" : item.cpTp === 9 ? "DC차데모+AC3상" : "DC차데모+DC콤보+AC3상"}
                    </li>
                  </ul>
                </td>
                <td>
                  <button onClick={() => delClick(item)}>삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
    </>
  );
};

export default Favorite;
