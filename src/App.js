import './App.css';
import {Route, Routes} from 'react-router-dom';
import TourList from './ui/components/TourList';
import Main from './ui/components/Main';
import ChargingMap from './ui/components/ChargingMap';
import Favorite from './ui/components/Favorite';
import TourInfo from './ui/components/TourInfo';
import TourMap from './ui/components/TourMap';
import {createContext} from 'react';
import DirectionsMap from './ui/components/DirectionsMap';
export const AppContext = createContext();

function App() {
  const coordi = {
    flag: Number,
    chargingStation: {lat: Number, lng: Number},
    tour: {lat: Number, lng: Number},
  };
  return (
    <div className="App">
      <AppContext.Provider value={coordi}>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/tour'} element={<TourList />} />
          <Route path={'/map'} element={<ChargingMap />} />
          <Route path={'/favorite'} element={<Favorite />} />
          <Route path={'/info'} element={<TourInfo />} />
          <Route path={'/tourMap'} element={<TourMap />} />
          <Route path={'/directions'} element={<DirectionsMap />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
