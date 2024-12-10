// frontend/src/App.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:5000");

// Custom Icon for Markers
const customIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png", // Replace with your custom icon URL if needed
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  iconSize: [38, 38], // Icon size
  shadowSize: [50, 64], // Shadow size
  iconAnchor: [22, 38], // Position of the icon relative to the marker point
  shadowAnchor: [4, 62], // Position of the shadow
  popupAnchor: [-3, -38], // Position of the popup relative to the icon
});

function Location() {
  const [userLocation, setUserLocation] = useState(null);
  const [otherLocations, setOtherLocations] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    // Watch for user's geolocation updates
    navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const location = { lat: latitude, lng: longitude };
        setUserLocation(location);
        socket.emit("update-location", location);
      },
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );

    // Listen for updates from other devices
    socket.on("location-updated", (locations) => {
      const otherUsers = Object.values(locations).filter((loc) => loc.lat && loc.lng);
      setOtherLocations(otherUsers);
    });

    return () => socket.disconnect();
  }, []);

  // Haversine formula for distance calculation
  const calculateDistance = (loc1, loc2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (loc1.lat * Math.PI) / 180;
    const φ2 = (loc2.lat * Math.PI) / 180;
    const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180;
    const Δλ = ((loc2.lng - loc1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c / 1000).toFixed(2); // Distance in kilometers
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userLocation} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
          {otherLocations.map((loc, index) => (
            <Marker key={index} position={loc} icon={customIcon}>
              <Popup>Device {index + 1}</Popup>
            </Marker>
          ))}
          {userLocation &&
            otherLocations.map((loc, index) => (
              <Polyline
                key={index}
                positions={[userLocation, loc]}
                color="blue"
              />
            ))}
          {userLocation &&
            otherLocations.map((loc, index) => (
              <Popup
                position={[
                  (userLocation.lat + loc.lat) / 2,
                  (userLocation.lng + loc.lng) / 2,
                ]}
                key={`distance-${index}`}
              >
                Distance: {calculateDistance(userLocation, loc)} km
              </Popup>
            ))}
        </MapContainer>
      )}
    </div>
  );
}

export default Location;
