import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

const OpenStreetMapPlot = ({ lat, lng }) => {
  const position = [lat, lng];

  const mainIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [38, 38],
  });

  const nearbyIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  });

  const nearbyLocations = [
    {
      id: 1,
      coords: [lat + 0.002, lng + 0.002],
      profile: {
        name: "Ravi Sharma",
        service: "Electrician",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    },
    {
      id: 2,
      coords: [lat - 0.003, lng - 0.001],
      profile: {
        name: "Amit Patel",
        service: "Plumber",
        img: "https://randomuser.me/api/portraits/men/44.jpg",
      },
    },
    {
      id: 3,
      coords: [lat + 0.004, lng - 0.002],
      profile: {
        name: "Neha Verma",
        service: "Home Tutor",
        img: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    },
  ];

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-md overflow-hidden">
      <MapContainer center={position} zoom={15} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Main marker */}
        <Marker position={position} icon={mainIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {/* ⭕ 1KM Circle Around Main Marker */}
        <Circle
          center={position}
          radius={1000}     // 👈 1000 meters = 1 KM
          weight={2}        // visible boundary thickness
          fillOpacity={0.1} // light transparent inner area
        />

        {/* Nearby markers with popup */}
        {nearbyLocations.map((loc) => (
          <Marker key={loc.id} position={loc.coords} icon={nearbyIcon}>
            <Popup>
              <div className="flex flex-col items-center  gap-1 p-2">
                <img
                  src={loc.profile.img}
                  className="w-12 h-12 rounded-full border shadow-sm object-cover"
                  alt="profile"
                />
                <p className="font-semibold text-sm">{loc.profile.name}</p>
                <p className="text-xs text-gray-600">{loc.profile.service}</p>
                <button
                  className="mt-1 bg-blue-500 text-white px-2 py-1 text-xs rounded-lg hover:bg-blue-600 transition"
                  onClick={() => alert(`Opening ${loc.profile.name} profile...`)}
                >
                  View Profile
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default OpenStreetMapPlot;
