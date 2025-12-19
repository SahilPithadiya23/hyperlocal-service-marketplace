
// export default OpenStreetMapPlot;
// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
// import L from "leaflet";

// const OpenStreetMapPlot = ({ lat, lng }) => {
//   // 🔧 Ensure we convert input to real numbers
//   const latitude = parseFloat(lat);
//   const longitude = parseFloat(lng);

//   console.log("Safe parsed coords → LAT:", latitude, "LNG:", longitude);

//   if (isNaN(latitude) || isNaN(longitude)) {
//     return <p className="text-red-500 font-semibold">Location not valid</p>;
//   }

//   const position = [latitude, longitude];

//   const mainIcon = new L.Icon({
//     iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//     iconSize: [38, 38],
//   });

//   const nearbyIcon = new L.Icon({
//     iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
//     iconSize: [32, 32],
//   });

//   // 📍 Nearby markers now use safe numbers, not raw props
//   const nearbyLocations = [
//     {
//       id: 1,
//       coords: [latitude + 0.002, longitude + 0.002],
//       profile: {
//         name: "Ravi Sharma",
//         role: "electrician",
//         avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//       },
//     },
//     {
//       id: 2,
//       coords: [latitude - 0.003, longitude - 0.001],
//       profile: {
//         name: "Amit Patel",
//         role: "plumber",
//         avatar: "https://randomuser.me/api/portraits/men/44.jpg",
//       },
//     },
//     {
//       id: 3,
//       coords: [latitude + 0.004, longitude - 0.002],
//       profile: {
//         name: "Neha Verma",
//         role: "home tutor",
//         avatar: "https://randomuser.me/api/portraits/women/65.jpg",
//       },
//     },
//   ];

//   return (
//     <div className="w-full h-[500px] rounded-2xl shadow-md overflow-hidden">
//       <MapContainer center={position} zoom={15} className="w-full h-full">
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />

//         {/* Main marker */}
//         <Marker position={position} icon={mainIcon}>
//           <Popup>Your current spot</Popup>
//         </Marker>

//         {/* ⭕ 1KM circle always stable */}
//         <Circle center={position} radius={1000} weight={2} fillOpacity={0.1} />

//         {/* Nearby markers */}
//         {nearbyLocations.map((loc) => (
//           <Marker key={loc.id} position={loc.coords} icon={nearbyIcon}>
//             <Popup>
//               <div className="flex flex-col items-center gap-1 p-2">
//                 <img
//                   src={loc.profile.avatar}
//                   className="w-12 h-12 rounded-full border shadow-sm object-cover"
//                   alt="profile"
//                 />
//                 <p className="font-semibold text-sm">{loc.profile.name}</p>
//                 <p className="text-xs text-gray-600 capitalize">{loc.profile.role}</p>
//                 <button
//                   className="mt-1 bg-blue-500 text-white px-2 py-1 text-xs rounded-lg hover:bg-blue-600 transition"
//                   onClick={() => alert(`Viewing ${loc.profile.name}`)}
//                 >
//                   Show details
//                 </button>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default OpenStreetMapPlot;


import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";

/* 🔹 This component moves the map when coords change */
const ChangeView = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 15, {
      animate: true,
    });
  }, [center, map]);

  return null;
};

const OpenStreetMapPlot = ({ lat, lng }) => {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    return <p className="text-red-500">Invalid location</p>;
  }

  const position = [latitude, longitude];

  const mainIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [40, 40],
  });

  const nearbyIcon = new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [40, 40],
  });

  const nearbyLocations = [
    {
      id: 1,
      coords: [latitude + 0.002, longitude + 0.002],
      profile: { name: "Ravi Sharma", role: "electrician" },
    },
    {
      id: 2,
      coords: [latitude - 0.003, longitude - 0.001],
      profile: { name: "Amit Patel", role: "plumber" },
    },
  ];

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden">
      <MapContainer center={position} zoom={15} className="w-full h-full ">
        {/* 🔑 THIS IS THE FIX */}
        <ChangeView center={position} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <Marker position={position} icon={mainIcon}>
          <Popup>Your selected location</Popup>
        </Marker>

        <Circle center={position} radius={1000} />

        {nearbyLocations.map((loc) => (
          <Marker key={loc.id} position={loc.coords} icon={nearbyIcon}>
            <Popup>
              <b>{loc.profile.name}</b>
              <br />
              {loc.profile.role}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default OpenStreetMapPlot;
