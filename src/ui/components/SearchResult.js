import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const SearchResult = ({addr , isClicked}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mainLong, setMainLong] = useState(null);
    const [mainLat, setMainLat] = useState(null);
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
        setMainLong(long);
        setMainLat(lat);
        console.log(long, lat);
        console.log(mainLong, mainLat);
        navigate('/map', {state: {mapLong: long, mapLat: lat}});
    };
   
    if(loading) return <div>Loading...</div>;
    if(error)   return <div>Error...</div>;

    return(
        <div>
            {data && <h1>RESULT</h1>}
            {data && data.map((item) => (
                <ul
                    className={'tour'}
                    key={item.csid}
                    data-long={item.longi} 
                    data-lat={item.lat}
                    onClick={onClick}
                >
                    <li>{item.csNm}</li>
                    <li>{item.addr}</li>
                    <li>
                        {item.cpStat === 1 ? "충전가능" : item.cpStat === 2 ? "충전중" : item.cpStat === 3 ? "고장/점검" : item.cpStat === 4 ? "통신장애" : "통신미연결"}
                    </li>
                    <li>
                        {item.chargeTp === 1 ? "완속" : "급속" }
                    </li>
                </ul>
            ))}
        </div>
    );
};


export default SearchResult;