import React, { useState } from "react";
import OpenStreetMapPlot from "../components/OpenStreetMapPlot";
import SmartLocationInput from "../components/SmartLocationInput";
function App() {
  const [lat, setLat] = useState(23.0225); // Default Ahmedabad
  const [lng, setLng] = useState(72.5714);
  const [address, setAddress] = useState("");
  const dummyProviders = [
  { id: 1, name: "Amdavad Electricians", lat: 23.0230, lng: 72.5720, serviceType: "Electrical" },
  { id: 2, name: "Gujarat Plumbers", lat: 23.0210, lng: 72.5700, serviceType: "Plumbing" },
  { id: 3, name: "Rajkot Cleaners", lat: 23.0500, lng: 72.5800, serviceType: "Cleaning" }, // Out of range
];

  const handleLocationChange = async (newLat, newLng, manualAddress = null) => {
    setLat(newLat);
    setLng(newLng);

    if (manualAddress) {
      setAddress(manualAddress);
    } else {
      // If user dragged the pin, find the new address text
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`);
      const data = await res.json();
      setAddress(data.display_name);
    }
  };

  return (

    // Changed max-w-2xl to max-w-6xl for a much wider layout
    <div className="max-w-6xl mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Search Location / Precisely drag the pin to your building for better service.</h1>
      
      <SmartLocationInput
        lat={lat} 
        lng={lng} 
        currentAddress={address}
        onSelect={(lt, ln, addr) => handleLocationChange(lt, ln, addr)}
      />
      
      {/* Increased the margin and shadow for a "bigger" feel */}
      <div className="mt-6 rounded-3xl border-8 border-white shadow-2xl overflow-hidden md:grow">
        <OpenStreetMapPlot 
          lat={lat} 
          lng={lng} 
          onLocationChange={(lt, ln) => handleLocationChange(lt, ln)} 
          providers={dummyProviders}
        />
      </div>
      
      <p className="mt-4 text-sm text-gray-500 text-center font-medium">
        📍 Precisely drag the pin to your building for better service.
      </p>
    </div>
  );
}

export default App;