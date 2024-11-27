import React, {useState} from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';

import {Col, Row} from "antd";
import {useAuthStore} from "../../../store/auth/auth";
import {LayoutType} from "../../../types/LayoutType";
import DeviceCart from "../camera/DeviceCart";
import ButtonAddPlus from "../../buttons/buttonAddPlus/ButtonAddPlus";
import AddDeviceInLayout from "../../modals/addDeviceInLayout/AddDeviceInLayout";


interface LayoutData{
    layout:LayoutType[];
    onLayoutUpdate: () => void;
}

const LayoutCartComponent2: React.FC<LayoutData> = ({layout,onLayoutUpdate}) => {

    const {user,SmartDVRToken}=useAuthStore();
    const [showAddDeviceModal, setShowAddDeviceNodal]=useState(false)
    const [currentLayoutUID, setCurrentLayoutUID] = useState<string | null>(null);


    const handleAddDeviceInLayout = (uid: string) => {
        setCurrentLayoutUID(uid);
        setShowAddDeviceNodal(true)
    };


    const handleOkLayoutModal = () => {
        setShowAddDeviceNodal(false);
        onLayoutUpdate();
    };

    const handleCancelLayoutModal = () => {
        setShowAddDeviceNodal(false)
    };

    return (

        <div className="allDeviceMedium">
            <Row gutter={[16, 16]}>
                {layout.map((layoutItem, index) => (
                    <div key={index} className="LayoutItem">
                        <div className="titleLayoutComnponent">
                            <h2 className="layoutH2">{layoutItem.name}</h2>
                            <h2 className="countDeviceLayout">({layoutItem.devices.length})</h2>
                            <ButtonAddPlus onClick={() => handleAddDeviceInLayout(layoutItem.uid)}/>
                        </div>

                        <Col xs={24} sm={12} lg={6} key={layoutItem.id}>
                            {layoutItem.devices.length > 0 ? (
                                <DeviceCart key={`${index}-0`} device={layoutItem.devices[0]} layout={layoutItem}/>
                            ) : (
                                <div className="emptyDevicePlaceholder">
                                    {/* Пустой блок для сохранения размера раскладки */}
                                </div>
                            )}
                        </Col>
                        {currentLayoutUID === layoutItem.uid && (
                            <AddDeviceInLayout
                                key={layoutItem.uid} // Добавляем key для перерисовки
                                layout={layoutItem}
                                visible={showAddDeviceModal}
                                onOk={handleOkLayoutModal}
                                onCancel={handleCancelLayoutModal}
                                existingDevices={layoutItem.devices.map((device) => device.UID)}
                            />
                        )}
                    </div>

                ))}

            </Row>
        </div>
    );
};
export default LayoutCartComponent2;
