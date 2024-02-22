import "./App.css";
import { Route, Routes } from "react-router-dom";
import TourList from "./ui/components/TourList";
import Main from "./ui/components/Main";
import ChargingMap from "./ui/components/ChargingMap";
import Favorite from "./ui/components/Favorite";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/tour"} element={<TourList />} />
        <Route path={"/map"} element={<ChargingMap />} />
        <Route path={"/favorite"} element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
