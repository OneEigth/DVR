import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Device } from '../../types/Device';

interface LocationMapProps {
    devices: Device[] | null;
}

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/'; // иконка маркера
const LocationMap2: React.FC<LocationMapProps> = ({ devices }) => {
    const mapRef = useRef<any>(null);

    // Установим центр карты на первое устройство из массива
    useEffect(() => {
        if (mapRef.current && devices && devices.length > 0) {
            const firstDevice = devices[0];
            mapRef.current.setView([firstDevice.latitude, firstDevice.longitude], 15);
        }
    }, [devices]);

    if (!devices || devices.length === 0) {
        return <div>No devices available</div>; // Обработка случая, когда устройства отсутствуют
    }

    return (
        <div className="LocationMap">
            <MapContainer
                ref={mapRef}
                center={[devices[0].latitude, devices[0].longitude]} // Центр на первом устройстве
                zoom={15}
                style={{
                    height: 'calc(100vh - 176px)',
                    width: '480px',
                    borderRadius: '5px',
                    zIndex: 0 /* Подправлено значение */,
                    position: 'relative',
                    marginRight: 24,
                }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Отображаем маркеры для всех устройств */}
                {devices.map((device) => (
                    <Marker key={device.UID} position={[device.latitude, device.longitude]}>
                        <Popup>
                            <div>
                                <p>
                                    <strong>Owner UID:</strong> {device.ownerUID}
                                </p>
                                <p>
                                    <strong>Device UID:</strong> {device.UID}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default LocationMap2;
