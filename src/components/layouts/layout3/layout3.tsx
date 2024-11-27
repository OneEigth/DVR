import React, {useState} from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';
import {Card, Col, Row} from "antd";
import {useAuthStore} from "../../../store/auth/auth";
import {LayoutType} from "../../../types/LayoutType";
import AddDeviceInLayout from "../../modals/addDeviceInLayout/AddDeviceInLayout";
import ButtonAddPlus from "../../buttons/buttonAddPlus/ButtonAddPlus";



interface LayoutData{
    layout:LayoutType[];
    onLayoutUpdate: () => void;
}

const LayoutCartComponent3: React.FC<LayoutData> = ({layout,onLayoutUpdate}) => {

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

    const handleDeviceClick = (deviceUID: string) => {

    };

    const handleError = (e:any) => {
       /* e.target.src = img; // Устанавливаем локальную картинку при ошибке загрузки*/
    };

    return (

        <div className="AllLayoutItem">
            <Row gutter={[16, 16]}>
                {layout.map((layoutItem, index) => (
                    <div key={index} className="LayoutItem">
                        <Col xs={24} sm={12} lg={6} key={layoutItem.id}>

                                <div className="containerCard"
                                     /*onClick={() => handleDeviceClick(file.UID)}*/
                                     style={{borderRadius: 0}}>
                                    <Card
                                        className="coverCard"
                                        key={layoutItem.id}
                                        cover={<img alt="" className="img"
                                                    /*src={VIDEO_PREVIEW_URL(file.UID, SmartDVRToken)}*/
                                                    style={{width: 280, height: 192, borderRadius: 0}}/>}
                                        onError={handleError}
                                        style={{borderRadius: 0}}
                                    />
                                    <div className="LayoutPropertiesPart1">
                                        <div className="titleLayout2">
                                            <div>
                                                <h1 className="name">
                                                    {layoutItem.name}
                                                 </h1>
                                            </div>
                                            <div>
                                                 <ButtonAddPlus onClick={() => handleAddDeviceInLayout(layoutItem.uid)}/>
                                            </div>
                                        </div>
                                        <div className="propertyGroup">
                                            <h3 className="property">Описание: {layoutItem.description}</h3>
                                            <h3 className="property">Пользователь: {layoutItem.userName}</h3>
                                            <h3 className="property">Вид: {layoutItem.viewType}</h3>
                                            <h3 className="property">Колличество устройств: {layoutItem.devices.length}</h3>
                                        </div>
                                    </div>
                                </div>

                        </Col>
                        {currentLayoutUID === layoutItem.uid && (
                            <AddDeviceInLayout
                                key={layoutItem.uid}
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
export default LayoutCartComponent3;
