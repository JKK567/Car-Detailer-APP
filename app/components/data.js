export const detailers = [
  {
    name: "Uncle Mike`s Mobile Auto Detailing Service US Navy Veteran",
    location: { lat: 41.93962, lng: -71.28145 },
    address: "124 Pine St, Attleboro, MA 02703",
    contact: "(508) 982-0451",
  },
  {
    name: "DF Detailing",
    location: { lat: 41.97391, lng: -71.466896 },
    address: "21 Manville Hill Road, Cumberland, RI, 02864",
    contact: "(857) 243-5290",
  },
  {
    name: "Pay Attention To Detail",
    location: { lat: 42.29675, lng: -71.059784 },
    address: "20 Parkman St, Dorchester, MA 02122",
    contact: "(857) 244-1516",
  },
];

export function getNearbyDetailers(userLocation, radiusInMiles) {
  const EARTH_RADIUS = 3963.2; // Earth radius in miles
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  return detailers.filter((detailer) => {
    const dLat = toRadians(detailer.location.lat - userLocation.lat);
    const dLng = toRadians(detailer.location.lng - userLocation.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(userLocation.lat)) *
        Math.cos(toRadians(detailer.location.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS * c;

    return distance <= radiusInMiles;
  });
}
