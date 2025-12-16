import React, { useState } from "react";

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    }
    setLoading(false);
  };

  return (
    <div className="mb-4 max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search location (e.g. Ahmedabad)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg"
        />
        <button
          onClick={searchLocation}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-sm mt-1">Searching...</p>}

      {results.length > 0 && (
        <ul className="mt-2 border rounded-lg bg-white shadow">
          {results.map((place) => (
            <li
              key={place.place_id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => {
                onSelect(
                  parseFloat(place.lat),
                  parseFloat(place.lon),
                  setQuery(place.display_name)
                );
                setResults([]);
                setQuery(place.display_name);
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
