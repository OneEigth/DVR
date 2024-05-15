import React, { useEffect, useState } from 'react';
import './style/style.css';
import 'leaflet/dist/leaflet.css';
import CardComponent from '../../../../cards/cardComponentMedium/CardComponent';
import { Col, Row } from 'antd';
import { useDevicesStore } from '../../../../../store/devices/allDevices';
import CardComponentBig from "../../../../cards/cardComponentBig/CardComponentBig";


interface AllDevicesBigProps {
    onSelectDevice: (selectedUID: string) => void;
}

const AllDevicesBig: React.FC<AllDevicesBigProps> = ({onSelectDevice}) => {
    const { devices, fetchDevices } = useDevicesStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [showLocationMap, setShowLocationMap] = useState<boolean>(false);


    useEffect(() => {
        fetchDevices();
    }, []);

    const handleViewVideo = (uid: string) => {
        console.log('View video for UID:', uid);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = devices.slice(startIndex, startIndex + pageSize);

    // Разделение устройств на три колонки
    const thirdLength = Math.ceil(devicesOnPage.length / 3);
    const devicesFirstColumn = devicesOnPage.slice(0, thirdLength);
    const devicesSecondColumn = devicesOnPage.slice(thirdLength, thirdLength * 2);
    const devicesThirdColumn = devicesOnPage.slice(thirdLength * 2);

    return (
        <div className="allDevice">
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    {devicesFirstColumn.map((device: any) => (
                        <CardComponentBig key={device.ID} file={device} handleViewVideo={handleViewVideo} />
                    ))}
                </Col>
                <Col span={8}>
                    {devicesSecondColumn.map((device: any) => (
                        <CardComponentBig key={device.ID} file={device} handleViewVideo={handleViewVideo} />
                    ))}
                </Col>
                <Col span={8}>
                    {devicesThirdColumn.map((device: any) => (
                        <CardComponentBig key={device.ID} file={device} handleViewVideo={handleViewVideo} />
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default AllDevicesBig;
