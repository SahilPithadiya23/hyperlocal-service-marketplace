import { useEffect, useState } from "react";

export const useSmartLocation = () => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    source: "init", // gps | search | ip
  });

  /* 🌍 Browser GPS */
  const getBrowserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          resolve({ latitude, longitude, accuracy });
        },
        reject,
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
      );
    });
  };

  /* 🌐 IP fallback */
  const getIPLocation = async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  };

  /* 🚀 Initialize location */
  const initLocation = async () => {
    try {
      const gps = await getBrowserLocation();

      if (gps.accuracy && gps.accuracy < 5000) {
        setLocation({
          lat: gps.latitude,
          lng: gps.longitude,
          source: "gps",
        });
        return;
      }
      throw new Error("Low accuracy");
    } catch {
      const ip = await getIPLocation();
      setLocation({
        lat: ip.latitude,
        lng: ip.longitude,
        source: "ip",
      });
    }
  };

  /* 🔍 Manual override from search */
  const setLocationFromSearch = (lat, lng) => {
    setLocation({
      lat,
      lng,
      source: "search",
    });
  };

  useEffect(() => {
    initLocation();
  }, []);

  return {
    location,
    setLocationFromSearch,
  };
};
