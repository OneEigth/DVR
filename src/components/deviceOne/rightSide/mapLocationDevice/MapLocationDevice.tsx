import React from "react";
import "./style.css"
import {Device} from "../../../../types/Device";
import LocationMap from "../../../locationMap/LocationMap";

interface MapLocationDeviceProps {
    device: Device
}

const MapLocationDevice: React.FC<MapLocationDeviceProps> = ({device}) => {
    return (
        <div className="map_container">
            <LocationMap device={device}/>
        </div>
    )
};
export default MapLocationDevice;