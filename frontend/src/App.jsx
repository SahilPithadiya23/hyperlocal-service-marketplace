import React, { useEffect, useState } from "react";
import OpenStreetMapPlot from "./components/OpenStreetMapPlot";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  // Get laptop location once when component loads
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLong(pos.coords.longitude);
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);

  // Show loader until location arrives
  if (lat === null || long === null) {
    return <p>Fetching your location...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Location Plot</h1>
      <OpenStreetMapPlot lat={lat} long={long} />
    </div>
  );
}

export default App;
