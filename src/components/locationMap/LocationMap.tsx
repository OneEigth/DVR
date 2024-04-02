import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './style/Map.css';
import L from 'leaflet';

interface Device {
    latitude: number;
    longitude: number;
}

interface LocationMapProps {
    devices: Device[];
}

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const LocationMap: React.FC<LocationMapProps> = ({ devices }) => {
    return (
        <div style={{ width: '100px', height: '100px' }}>
            <MapContainer center={[51.154697, 71.431324]} zoom={12} style={{ height: '100vh', width: '100vh' }} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {devices.map((device, index) => (
                    <Marker key={index} position={[device.latitude, device.longitude]}>
                        <Popup>
                            Latitude: {device.latitude}, Longitude: {device.longitude}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default LocationMap;
