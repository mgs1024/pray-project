import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const SearchResult = ({addr , isClicked}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //const [mainLong, setMainLong] = useState(null);
    //const [mainLat, setMainLat] = useState(null);
    const navigate = useNavigate();    
    const serviceKey = process.env.REACT_APP_API_KEY;

    const search = async () => {
    try {
        setError(null);
        setData(null);
        setLoading(true);

        const response = await axios.get(
        `/service/EvInfoServiceV2/getEvSearchList?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&addr=${addr}`
        );
        console.log(response.data);
        
        setData(response.data.response.body.items.item);      

    } catch(e) {
        setError(e);
    }
    setLoading(false);
    };

    useEffect(() => {
        if (addr !== '' && isClicked) {
            search();
        }
    }, [addr, isClicked]);

    const onClick = e => {
        const long = e.currentTarget.getAttribute('data-long');
        const lat = e.currentTarget.getAttribute('data-lat');
        //setMainLong(long);
        //setMainLat(lat);
        console.log(long, lat);
        const csNm = e.currentTarget.getAttribute('data-csnm');
        const addr = e.currentTarget.getAttribute('data-addr');
        const cpNm = e.currentTarget.getAttribute('data-cpnm');
        const cpStat = e.currentTarget.getAttribute('data-cpstat');
        const cpTp = e.currentTarget.getAttribute('data-cptp');
        const chargeTp = e.currentTarget.getAttribute('data-chargetp');
        //console.log(mainLong, mainLat);
        navigate('/map', {
            state: {
              mapLong: long,
              mapLat: lat,
              csNm: csNm,
              addr: addr,
              cpNm: cpNm,
              cpStat: cpStat,
              cpTp: cpTp,
              chargeTp: chargeTp,
            },
          });
    };
   
    if(loading) return <div>Loading...</div>;
    if(error)   return <div>Error...</div>;

    return(
        <div>
            {data && <h1>RESULT</h1>}
            {data && data.map((item) => (
                <ul
                    className={'tour'}
                    key={item.cpid}
                    data-long={item.longi} 
                    data-lat={item.lat}
                    data-csnm={item.csNm}
                    data-addr={item.addr}
                    data-cpnm={item.cpNm}
                    data-cpstat={item.cpStat}
                    data-cptp={item.cpTp}
                    data-chargetp={item.chargeTp}
                    onClick={onClick}
                >
                    <li>{item.csNm}</li>
                    <li>{item.addr}</li>
                    <li>
                        {item.cpNm} :  
                        {item.cpStat === 1 ? " 충전가능" : item.cpStat === 2 ? " 충전중" : item.cpStat === 3 ? " 고장/점검" : item.cpStat === 4 ? " 통신장애" : " 통신미연결"}
                    </li>
                    <li>
                        {item.cpTp === 1 ? "B타입(5핀)" : item.cpTp === 2 ? "C타입(5핀)" : item.cpTp === 3 ?  "BC타입(5핀)" : item.cpTp === 4 ? "BC타입(7핀)" : item.cpTp === 5 ? "DC차데모" : item.cpTp === 6 ? "AC3상" : item.cpTp === 7 ? "DC콤보" : "DC차데모+DC콤보"}
                    </li>
                </ul>
            ))}
        </div>
    );
};


export default SearchResult;