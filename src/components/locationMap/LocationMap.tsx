import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import './style/style.css'
interface LocationMapProps {
    latitude: number;
    longitude: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
    return (
        <div style={{width: '100%', height: '400px'}}> {/* Установите желаемые размеры */}
            <MapContainer center={[latitude, longitude]} zoom={30} style={{height: '100%', width: '100%'}}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )

};

export default LocationMap;
