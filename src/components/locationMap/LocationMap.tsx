import React, {useEffect, useRef} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Card } from "antd";
import L from 'leaflet';
import {Device} from "../../types/Device";

interface LocationMapProps {
    device: Device;
}

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/"; // иконка маркера
const LocationMap: React.FC<LocationMapProps> = ({ device }) => {
    const mapRef = useRef<any>(null);

    // Обновление центра карты при изменении пропса device
    useEffect(() => {
        if (mapRef.current && device) {
            mapRef.current.setView([device.latitude, device.longitude], 15);
        }
    }, [device]);

    console.log("device "+device.UID)

    return (
        <div className="LocationMap">

                <MapContainer
                    ref={mapRef}
                    center={[device.latitude, device.longitude]}
                    zoom={15} style={{ height: '80vh', width: '450px', borderRadius:'5px'}}
                    scrollWheelZoom={false}>
                <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <Marker key={device.UID} position={[device.latitude, device.longitude]}>
                            <Popup>
                                OwnerUID:{device.ownerUID}
                            </Popup>
                        </Marker>
                </MapContainer>

        </div>
    );
};

export default LocationMap;