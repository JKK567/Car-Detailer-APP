"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map"; // Import the Map component
import { detailers, getNearbyDetailers } from "./components/data";

export default function Home() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyDetailers, setNearbyDetailers] = useState([]); // Store nearby detailers
  const [radius, setRadius] = useState(20); // Default radius in miles
  const handleSearch = (coords: { lat: number; lng: number }) => {
    setCoordinates(coords); // Update state with the received coordinates
    console.log("Received Coordinates:", coords);

    // Find nearby detailers and update the state
    const results = getNearbyDetailers(coords, 20); // 20-mile radius
    setNearbyDetailers(results);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Nearby Car Detailers</h1>
        <p className="text-gray-600">Enter your address to see detailers near you!</p>
      </header>
      <main className="w-full max-w-lg">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Radius Selector */}
        <div className="mt-4">
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
            Search Radius: {radius} miles
          </label>
          <input
            id="radius"
            type="range"
            min="1"
            max="50"
            step="1"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        {/* Display Coordinates */}
        {coordinates && (
          <div className="mt-8 p-4 bg-gray-100 rounded shadow">
            <p>
              <strong>Latitude:</strong> {coordinates.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {coordinates.lng}
            </p>
          </div>
        )}

        {/* Display Map */}
        {coordinates && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Nearby Detailers</h2>
            <Map userCoords={coordinates} detailers={nearbyDetailers} />
          </div>
        )}

        {/* Display Nearby Detailers */}
        {nearbyDetailers.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Nearby Detailers</h2>
            {nearbyDetailers.map((detailer, index) => (
              <div key={index} className="p-4 border rounded shadow-sm mb-4">
                <h3 className="font-bold">{detailer.name}</h3>
                <p>Address: {detailer.address}</p>
                <p>Contact: {detailer.contact}</p>
              </div>
            ))}
          </div>
        ) : (
          coordinates && (
            <p className="mt-8 text-gray-600">
              No detailers found within 20 miles of your location.
            </p>
          )
        )}
      </main>
    </div>
  );
}
