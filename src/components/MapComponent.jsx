import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue in React
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = () => {
    const apiKey = import.meta.env.VITE_MAPS_API;// Your Geoapify API Key

  // Vadodara Coordinates
  const vadodaraLocation = { lat: 22.3072, lon: 73.1812, name: "Vadodara, India" };

  return (
    <MapContainer center={[vadodaraLocation.lat, vadodaraLocation.lon]} zoom={12} style={{ height: "250px", width: "100%" }}>
      {/* Geoapify Tile Layer */}
      <TileLayer
        url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
        attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors'
      />

      {/* Add Static Marker for Vadodara */}
      <Marker position={[vadodaraLocation.lat, vadodaraLocation.lon]} icon={customIcon}>
        <Popup>{vadodaraLocation.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
