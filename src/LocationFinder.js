// src/LocationFinder.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './LocationFinder.css';

const LocationFinder = () => {
  const [locationName, setLocationName] = useState('');
  const [position, setPosition] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([lat, lon]);
      } else {
        alert('Location not found.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Location Finder</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Enter your location name"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Find Location
          </button>
        </div>

        {position && (
          <MapContainer center={position} zoom={12} style={{ height: '500px', width: '100%' }} className="rounded">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', iconSize: [38, 95] })}>
              <Popup>{locationName}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default LocationFinder;