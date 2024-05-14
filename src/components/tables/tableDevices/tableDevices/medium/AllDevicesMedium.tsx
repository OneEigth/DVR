import React, {useEffect, useState} from 'react';
import './style/style.css';
import 'leaflet/dist/leaflet.css';
import CardComponent from '../../../../cards/cardComponentMedium/CardComponent';
import {Col, Row} from "antd";
import {useDevicesStore} from "../../../../../store/devices/allDevices";



interface AllDevicesMediumProps {
    onSelectDevice: (selectedUID: string) => void;
}

const AllDevicesMedium: React.FC<AllDevicesMediumProps> = ({onSelectDevice}) => {
    const {devices, fetchDevices} = useDevicesStore(); // Получаем список устройств и метод для загрузки
    const [currentPage, setCurrentPage] = useState<number>(1); // Состояние текущей страницы
    const [pageSize, setPageSize] = useState<number>(10); // Состояние размера страницы
    const [showLocationMap, setShowLocationMap] = useState<boolean>(false);




     useEffect(() => {
         fetchDevices();
     }, []);

    const handleViewVideo = (uid: string) => {
        console.log('View video for UID:', uid);
    };

    const startIndex = (currentPage - 1) * pageSize;

    // Отображаем только устройства на текущей странице
    const devicesOnPage = devices.slice(startIndex, startIndex + pageSize);

    const handleSwitchChange = (isChecked: boolean) => {
        setShowLocationMap(isChecked);
    };

    const halfLength = Math.ceil(devicesOnPage.length / 2);
    const devicesFirstColumn = devicesOnPage.slice(0, halfLength);
    const devicesSecondColumn = devicesOnPage.slice(halfLength);

    return (
        //средние значки
        <div className="allDevice">
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    {devicesFirstColumn.map((device: any) => (
                        <CardComponent key={device.ID} file={device} handleViewVideo={handleViewVideo} />
                    ))}
                </Col>
                <Col span={12}>
                    {devicesSecondColumn.map((device: any) => (
                        <CardComponent key={device.ID} file={device} handleViewVideo={handleViewVideo} />
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default AllDevicesMedium;
