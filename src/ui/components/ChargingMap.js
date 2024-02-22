import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChargingMap = () => {
  const [mapLong, setMapLong] = useState("127.729970");
  const [mapLat, setMapLat] = useState("37.881315");
  const navigate = useNavigate();
  function onClick(e) {
    setMapLong(e.currentTarget.getAttribute("data-long"));
    setMapLat(e.currentTarget.getAttribute("data-lat"));
    console.log(mapLong, mapLat);
    navigate("/tour", { state: { tourLong: mapLong, tourLat: mapLat } });
  }

  return (
    <div>
      <h1>지도</h1>
      <button data-long={"127.729970"} data-lat={"37.881315"} onClick={onClick}>
        주변추천관광지
      </button>
    </div>
  );
};

export default ChargingMap;
