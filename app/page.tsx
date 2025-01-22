"use client";
import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const handleSearch = (coords: { lat: number; lng: number }) => {
    setCoordinates(coords); // Update state with the received coordinates
    console.log("Received Coordinates:", coords);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Nearby Car Detailers</h1>
        <p className="text-gray-600">Enter your address to see detailers near you!</p>
      </header>
      <main className="w-full max-w-lg">
        <SearchBar onSearch={handleSearch} />
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
        <div className="mt-8 w-full h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Map placeholder</p>
        </div>
      </main>
    </div>
  );
}
