import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ userCoords, detailers }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      zoom={12}
      center={userCoords}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      {/* Marker for User's Location */}
      {userCoords && <Marker position={userCoords} label="You" />}

      {/* Markers for Detailers */}
      {detailers.map((detailer, index) => (
        <Marker
          key={index}
          position={detailer.location}
          label={detailer.name}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
