import {useEffect, useState} from 'react';
import axios from 'axios';

const Favorite = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/favorite');
        console.log(res.data);
        setList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const delClick = async item => {
    if (window.confirm('삭제 하시겠습니까?')) {
      axios.delete(`http://localhost:3001/favorite/` + item.id);
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
                <td>
                  <ul style={{borderStyle: 'none'}}>
                    <li>{item.title}</li>
                    <li>도로명 : {item.addr1}</li>
                    <li>지번 : {item.addr2}</li>
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
