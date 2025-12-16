import React, { useEffect, useState } from "react";
import OpenStreetMapPlot from "./components/OpenStreetMapPlot";
import LocationSearch from "./components/LocationSearch";

function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      setLat(latitude);
      setLng(longitude);
    },
    () => {
      // If permission denied → fallback to default city
      setLat(23.0225); // Ahmedabad
      setLng(72.5714);
    },
    { enableHighAccuracy: true }
  );
}, []);


  if (lat === null || lng === null) {
    return <p>Fetching your location...</p>;
  }

  return (
    <div className="p-4 " >
      <div  >

      <h1 className="text-xl font-semibold mb-3">
        Hyperlocal Service Marketplace
      </h1>

      {/* 🔍 Location Search */}
      <LocationSearch
        onSelect={(newLat, newLng) => {
          setLat(newLat);
          setLng(newLng);
        }}
        />
        </div>
        <div>

          
      {/* 🗺 Map */}
      <OpenStreetMapPlot  lat={lat} lng={lng} />
        </div>
    </div>
  );
}

export default App;
