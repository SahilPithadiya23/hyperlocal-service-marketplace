import React, { useContext, useEffect, useState } from "react";
import OpenStreetMapPlot from "../components/OpenStreetMapPlot";
import LocationSearch from "../components/LocationSearch";
import { UserDataContext } from "../context/UserContext";

function Map() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const {user} = useContext(UserDataContext)

  useEffect(() => {
  // navigator.geolocation.getCurrentPosition(
  //   (pos) => {
  //     const { latitude, longitude } = pos.coords;
  //     setLat(latitude);
  //     setLng(longitude);
  //   },
  //   () => {
  //     // If permission denied → fallback to default city
  //     setLat(23.0225); // Ahmedabad
  //     setLng(72.5714);
  //   },
  //   { enableHighAccuracy: true }
  // );
  console.log("user profile in map page", user);
  if(user.profile.lat && user.profile.long){
    setLat(user.profile.lat);
    setLng(user.profile.long);
  }
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

export default Map;
