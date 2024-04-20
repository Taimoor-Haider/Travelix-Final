import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SimpleMap = ({ title }) => {
  const mapRef = useRef(null);
  const markers = [
    {
      geocode: [33.907, 73.3943],
      popUp: title,
    },
  ];

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={markers[0].geocode}
      zoom={20}
      ref={mapRef}
      style={{ height: "100vh", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode}></Marker>
      ))}
    </MapContainer>
  );
};

export default SimpleMap;
