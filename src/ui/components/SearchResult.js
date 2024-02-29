import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const SearchResult = ({addr , isClicked}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);
    const [page, setPage] = useState({
        current : 0,
        total : 0
    })

    //const [mainLong, setMainLong] = useState(null);
    //const [mainLat, setMainLat] = useState(null);
    const navigate = useNavigate();    
    const serviceKey = process.env.REACT_APP_API_KEY;

    const search = async () => {
    try {
        let num = page.current + 1;
        setError(null);
        setData(null);
        setLoading(true);
        setIsEmpty(false);
        
        console.log(page.current);     

        const response = await axios.get(
        `/service/EvInfoServiceV2/getEvSearchList?serviceKey=${serviceKey}&pageNo=${num}&numOfRows=10&addr=${addr}`
        );
        console.log(response.data);
        console.log(response.data.response.body.totalCount);
        setPage((prevPage) => ({
            ...prevPage,
            current : num,
            total: response.data.response.body.totalCount,            
        }));
        console.log(page.total);

        const newData = response.data.response.body.items.item;
        setData((prevData) => (prevData ? [...prevData, ...newData] : newData));

        if(response.data.response.body.items === ''){
            setIsEmpty(true);
        }

    } catch(e) {
        setError(e);
    }
    setLoading(false);
    };

    useEffect(() => {
        if (addr !== "" && isClicked) {            
            setData(null);
            setPage({current:0, total:0});
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
    const showMore = () => {  
        search();
    }
   
    if(loading) return <div>Loading...</div>;
    if(error)   return <div>Error...</div>;
    if(isEmpty) return <div><h3>검색결과가 없습니다.</h3></div>

    return(
        <div>
            {data && page.current === 1 && <h1>RESULT</h1>}
            {data && Array.isArray(data) ? (data.map((item) => (
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
                        {item.cpTp === 1 ? "B타입(5핀)" : item.cpTp === 2 ? "C타입(5핀)" : item.cpTp === 3 ?  "BC타입(5핀)" : item.cpTp === 4 ? "BC타입(7핀)" : item.cpTp === 5 ? 
                        "DC차데모" : item.cpTp === 6 ? "AC3상" : item.cpTp === 7 ? "DC콤보" : item.cpTp === 8 ? "DC차데모+DC콤보" : item.cpTp === 9 ? "DC차데모+AC3상" : "DC차데모+DC콤보+AC3상"}
                    </li>
                </ul>
            ))) : ( data && (
                <ul
                    className={'tour'}
                    key={data.cpid}
                    data-long={data.longi} 
                    data-lat={data.lat}
                    data-csnm={data.csNm}
                    data-addr={data.addr}
                    data-cpnm={data.cpNm}
                    data-cpstat={data.cpStat}
                    data-cptp={data.cpTp}
                    data-chargetp={data.chargeTp}
                    onClick={onClick}
                >
                    <li>{data.csNm}</li>
                    <li>{data.addr}</li>
                    <li>
                        {data.cpNm} :  
                        {data.cpStat === 1 ? " 충전가능" : data.cpStat === 2 ? " 충전중" : data.cpStat === 3 ? " 고장/점검" : data.cpStat === 4 ? " 통신장애" : " 통신미연결"}
                    </li>
                    <li>
                        {data.cpTp === 1 ? "B타입(5핀)" : data.cpTp === 2 ? "C타입(5핀)" : data.cpTp === 3 ?  "BC타입(5핀)" : data.cpTp === 4 ? "BC타입(7핀)" : data.cpTp === 5 ? 
                        "DC차데모" : data.cpTp === 6 ? "AC3상" : data.cpTp === 7 ? "DC콤보" : data.cpTp === 8 ? "DC차데모+DC콤보" : data.cpTp === 9 ? "DC차데모+AC3상" : "DC차데모+DC콤보+AC3상"}
                    </li>
                </ul>
            ))}
            {data && page.current * 10 <= page.total && (
                <button onClick={showMore}><h1>다음페이지</h1></button>
            )}
            <br />
        </div>
    );
};


export default SearchResult;