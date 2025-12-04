import React, { useEffect, useState } from "react";
import OpenStreetMapPlot from "./components/OpenStreetMapPlot";

function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Browser GPS → LAT:", pos.coords.latitude, "LNG:", pos.coords.longitude);
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        console.error("Location error:", err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  console.log("React State → LAT:", lat, "LNG:", lng);

  if (lat === null || lng === null) {
    return <p>Fetching your location...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Location Plot</h1>
      <OpenStreetMapPlot lat={lat} lng={lng} />
    </div>
  );
}

export default App;
