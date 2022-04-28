import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { getLocationOfCollectorApi } from "../services/locationService"

const MapDragMarker = () => {
    const center = {
        lat: 27.6862417,
        lng: 85.314199
    }
    const [draggable, setDraggable] = useState(true)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    // const [movingPosition, setMovingPosition] = useState()
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                console.log(marker.getLatLng());
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    useEffect(() => {
        let data = {
            entrydate: '2022-4-24',
            userId: 3
        }
        getLocationOfCollectorApi(data, (val) => {
            // let currAllVal = val;
            // setMovingPosition(val)
            // currAllVal.map(res => {
            //     let lat = res.Latitude
            //     let long = res.Longitude
            //     console.log(lat, long);
            //     return []
            // })
        })
    }, [])

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    )
}

export default MapDragMarker
