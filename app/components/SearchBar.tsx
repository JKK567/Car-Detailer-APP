import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (coords: { lat: number; lng: number }) => void }) {
  const [address, setAddress] = useState("");

  const handleSearch = async () => {
    if (!address.trim()) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        console.log("Geocoded Location:", location); // Debugging log
        onSearch(location); // Pass latitude and longitude to the parent component
      } else {
        console.error("Geocoding error:", data.status);
        alert("Could not find location. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        className="flex-grow p-2 border rounded shadow-sm"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
