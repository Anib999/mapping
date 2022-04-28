import { MapContainer, Marker, TileLayer, useMapEvent, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { getCurrentLocationOfCollectorApi } from '../services/locationService';
import { useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import { iconLists } from './iconLists';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

function MapContainers() {

  const [position, setPosition] = useState(null)
  const [allDataLat, setAllDataLat] = useState([])
  const [allData, setAllData] = useState([])
  const [intervalTime, setIntervalTime] = useState(1000);
  const [trackPosition, setTrackPosition] = useState(
    {
      lat: 27.6862417,
      lng: 85.314199
    }
  )
  const markerRef = useRef();

  useEffect(() => {
    if (allData.length !== 0) {
      const intervalId = setInterval(() => {
        getCurrentLocationOfCollectorApi(allData, (val) => {
          let currAllVal = val;
          setAllDataLat(currAllVal)
          let res = currAllVal[0];
          let pos = {
            lat: res.Latitude,
            lng: res.Longitude
          }
          setPosition(pos)
          setTrackPosition(pos)
        })

        setIntervalTime(7000)
      }, intervalTime)
      return () => {
        clearInterval(intervalId)
      };
    }
  }, [allData, intervalTime])

  const handleSubmitData = (res) => {
    setIntervalTime(0)
    setAllData(res)
  }

  const clearSubmitData = (res) => {
    setAllData([])
  }

  // const eventHandlers = useMemo(
  //   () => ({
  //     mouseover() {
  //       if (markerRef) markerRef.current.openPopup();
  //     },
  //     mouseout() {
  //       if (markerRef) markerRef.current.closePopup();
  //     },
  //     click(e) {
  //       console.log(e);
  //     }
  //   }),
  //   []
  // );

  const SetCenterMap = () => {
    const map = useMapEvent('click', (e) => {
      /**
       * for now tracking only one position
       * multiple tracking to do
       */
      map.setView(allDataLat.length === 1 ? trackPosition : e.latlng, map.getZoom(), {
        animate: true,
      })
    })
    return null
  }

  return (
    <>
      <Filter
        handleSubmitData={handleSubmitData}
        clearSubmitData={clearSubmitData}
      />
      <div className='mapContainerDiv'>
        <MapContainer
          center={trackPosition}
          zoom={15}
          scrollWheelZoom={false}
          className="map"
        >
          <SetCenterMap />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            position !== null &&
            position !== [] &&
            allDataLat.map((res, index) => {
              return (
                <Marker
                  key={index}
                  icon={iconLists[index] !== undefined ? iconLists[index] : iconLists[0]}
                  ref={markerRef}
                  position={
                    {
                      lat: res.Latitude,
                      lng: res.Longitude
                    }
                  }
                  // eventHandlers={eventHandlers}
                  draggable={true}
                >
                  {/* <Popup minWidth={90} autoClose={false}>
                    {res.User}
                  </Popup> */}
                  {
                    res.User !== null &&
                    res.User !== '' &&
                    <Tooltip
                      direction="top"
                      offset={[0, -10]}
                      opacity={1}
                      permanent
                    >
                      {res.User}
                    </Tooltip>
                  }
                </Marker>
              )
            })
          }
        </MapContainer>
      </div>
    </>
  )
}

export default MapContainers;
