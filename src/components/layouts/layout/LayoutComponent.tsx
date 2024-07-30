import React from 'react';
import './style.css';
import {Layout} from "../../../types/Layouts";
import DeviceCart from "../camera/DeviceCart";


interface LayoutData{
    layout:Layout
}
const LayoutCartComponent: React.FC<LayoutData> = ({layout}) => {



    return (
        <div className="LayoutCartComponent">
            {layout.devices.map((device, index) => (
                <DeviceCart key={index} device={device} />
            ))}
        </div>
    );
};

export default LayoutCartComponent;
