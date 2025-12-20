// import React, { useMemo, useRef, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix for default Leaflet icons not appearing correctly in React
// const defaultIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// // Component to move the map when search coordinates change
// function ChangeView({ center }) {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(center, 16);
//   }, [center, map]);
//   return null;
// }

// // The Draggable Marker Logic
// function DraggableMarker({ position, onLocationChange }) {
//   const markerRef = useRef(null);
//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//           const newPos = marker.getLatLng();
//           onLocationChange(newPos.lat, newPos.lng);
//         }
//       },
//     }),
//     [onLocationChange]
//   );

//   return (
//     <Marker
//       draggable={true}
//       eventHandlers={eventHandlers}
//       position={position}
//       ref={markerRef}
//       icon={defaultIcon}
//     >
//       <Popup>Drag this pin to your exact building!</Popup>
//     </Marker>
//   );
// }

// const OpenStreetMapPlot = ({ lat, lng, onLocationChange }) => {
//   const position = [lat, lng];

//   return (
//     <div className="w-full h-[450px] md:h-[80vh] rounded-xl overflow-hidden border shadow-inner ">
//       <MapContainer center={position} zoom={15} className="w-full h-full ">
//         <ChangeView center={position} />
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
//         <DraggableMarker position={position} onLocationChange={onLocationChange} />
        
//         <Circle center={position} radius={500} pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }} />
//       </MapContainer>
//     </div>
//   );
// };

// export default OpenStreetMapPlot;



import React, { useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Standard icon for the User/Center
const defaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Unique icon for Service Providers (Green)
const providerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);
  return null;
}

function DraggableMarker({ position, onLocationChange }) {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          onLocationChange(newPos.lat, newPos.lng);
        }
      },
    }),
    [onLocationChange]
  );

  return (
    <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef} icon={defaultIcon}>
      <Popup>Your Selected Location</Popup>
    </Marker>
  );
}

const OpenStreetMapPlot = ({ lat, lng, onLocationChange, providers = [] }) => {
  const centerPosition = [lat, lng];
  const RADIUS_METERS = 500;

  // Filter providers that are within the 500m radius
  const nearbyProviders = providers.filter((provider) => {
    const providerLatLng = L.latLng(provider.lat, provider.lng);
    const centerLatLng = L.latLng(lat, lng);
    return centerLatLng.distanceTo(providerLatLng) <= RADIUS_METERS;
  });

  return (
    <div className="w-full h-[450px] md:h-[80vh] rounded-xl overflow-hidden border shadow-inner">
      <MapContainer center={centerPosition} zoom={15} className="w-full h-full">
        <ChangeView center={centerPosition} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* User's Draggable Marker */}
        <DraggableMarker position={centerPosition} onLocationChange={onLocationChange} />
        
        {/* Visual Radius Circle */}
        <Circle 
          center={centerPosition} 
          radius={RADIUS_METERS} 
          pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1 }} 
        />

        {/* Render Nearby Providers */}
        {nearbyProviders.map((shop) => (
          <Marker 
            key={shop.id} 
            position={[shop.lat, shop.lng]} 
            icon={providerIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-blue-600">{shop.name}</h3>
                <p className="text-xs text-gray-600">{shop.serviceType}</p>
                <button className="mt-2 bg-blue-500 text-white text-[10px] px-2 py-1 rounded">
                  Book Now
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