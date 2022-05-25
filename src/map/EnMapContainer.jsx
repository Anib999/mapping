import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getLocationOfCollectorApi } from "../services/locationService";
import { useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import { dotIcon } from "./iconLists";

function EnMapContainer() {
  const [position, setPosition] = useState(null);
  const [allDataLat, setAllDataLat] = useState([]);
  const [allData, setAllData] = useState([]);
  const [intervalTime, setIntervalTime] = useState(1000);
  const [lastIndex, setLastIndex] = useState(0);
  const [trackPosition, setTrackPosition] = useState({
    lat: 27.6862417,
    lng: 85.314199,
  });
  const markerRef = useRef();

  useEffect(() => {
    if (allData.length !== 0) {
      const intervalId = setInterval(() => {
        getLocationOfCollectorApi(allData, (val) => {
          let currAllVal = val;
          let lastIndex = currAllVal.length - 1;
          setAllDataLat(currAllVal);
          setLastIndex(lastIndex);
          let res = currAllVal[lastIndex];
          let pos = {
            lat: res.Latitude,
            lng: res.Longitude,
          };
          setPosition(pos);
          setTrackPosition(pos);
        });

        setIntervalTime(7000);
      }, intervalTime);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [allData, intervalTime]);

  const handleSubmitData = (res) => {
    setIntervalTime(0);
    setAllData(res);
  };

  const clearSubmitData = (res) => {
    setAllData([]);
  };

  const SetCenterMap = () => {
    const map = useMapEvent("click", () => {
      map.setView(trackPosition, map.getZoom(), {
        animate: true,
      });
    });
    return null;
  };

  return (
    <>
      <Filter
        handleSubmitData={handleSubmitData}
        clearSubmitData={clearSubmitData}
        showEntryDate={true}
      />
      <div className="mapContainerDiv">
        <MapContainer
          center={trackPosition}
          zoom={15}
          scrollWheelZoom={true}
          attributionControl={false}
          className="map"
        >
          <SetCenterMap />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position !== null &&
            position !== [] &&
            allDataLat.map((res, index) => {
              return (
                <Marker
                  key={res.LId}
                  icon={
                    index === 0 || index === lastIndex ? dotIcon[0] : dotIcon[1]
                  }
                  ref={markerRef}
                  position={{
                    lat: res.Latitude,
                    lng: res.Longitude,
                  }}
                  // draggable={true}
                >
                  <Popup>{res?.EntryDate}</Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </>
  );
}

export default EnMapContainer;
