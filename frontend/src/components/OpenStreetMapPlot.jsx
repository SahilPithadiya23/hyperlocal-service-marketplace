import React from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom hook to set view & max zoom
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const OpenStreetMapPlot = ({ lat, long }) => {
  return (
    <div className="w-full h-[500px] rounded-2xl shadow-md overflow-hidden">
      <MapContainer center={[lat, long]} zoom={19} className="w-full h-full">
        <ChangeView center={[lat, long]} zoom={19} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={17}
        />
        <Marker position={[lat, long]} />
      </MapContainer>
    </div>
  );
};

export default OpenStreetMapPlot;
