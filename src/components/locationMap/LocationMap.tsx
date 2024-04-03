import React, {useEffect, useRef} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Card } from "antd";
import L from 'leaflet';

interface Device {
    latitude: number;
    longitude: number;
    ownerUID: string;
}

interface LocationMapProps {
    devices: Device[];
    center: [number, number];
    selectedCoordinates: [number, number] | null;
}

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/"; // иконка маркера
const LocationMap: React.FC<LocationMapProps> = ({ devices, center, selectedCoordinates }) => {
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (mapRef.current && selectedCoordinates) {
            mapRef.current.setView(selectedCoordinates, 12);
        }
    }, [selectedCoordinates]);

    return (
        <div className="LocationMap">
            <Card>
                <MapContainer
                    ref={mapRef}
                    center={selectedCoordinates || center}
                    zoom={12} style={{ height: '825px', width: '790px' }}
                    scrollWheelZoom={true}>
                <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {devices.map((device, index) => (
                        <Marker key={index} position={[device.latitude, device.longitude]}>
                            <Popup>
                                OwnerUID:{device.ownerUID}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Card>
        </div>
    );
};

export default LocationMap;