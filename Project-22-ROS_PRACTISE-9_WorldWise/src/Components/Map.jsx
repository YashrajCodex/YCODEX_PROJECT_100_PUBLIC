import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
// import { useGeoLocation } from "../hooks/useGeoLocation"
// import {useURLPos} from '../hooks/useURLPos'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
// import Button from "./Button";

export default function Map() {
  const { cities } = useCities();
  const [mapPos, setMapPos] = useState([]);
  // const {isLoading: isLoadingPosition, position: geoLocationPos, getPosition} = useGeoLocation();

  // const [lat, lng] = useURLPos();
  const [lat , lng] = [50, 40]

  useEffect(
    function () {
      if (lat && lng) setMapPos([lat, lng]);
    },
    [lat, lng]
  );

  // useEffect(function () { 
  //   if(geoLocationPos) setMapPos([geoLocationPos.lat, geoLocationPos.lng])
  // },[geoLocationPos])
  return (
    <div className={styles.mapContainer}>
      {/* <h3>searchParams:{`lat: ${lat}-----lng: ${lng}`}</h3> */}

      {/* {!geoLocationPos && <Button type="position" onClick={getPosition}>{ isLoadingPosition? "Loading..." : "use your position"}</Button>} */}
      {/* <MapContainer
        center={mapPos}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
          url="https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.postion.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPos} />
        <DetectClick />
      </MapContainer> */}
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
