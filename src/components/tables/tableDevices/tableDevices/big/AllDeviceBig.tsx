import React, { useEffect, useState } from 'react';
import './style/style.css';
import 'leaflet/dist/leaflet.css';
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



    useEffect(() => {
        fetchDevices();
    }, []);

    const handleViewVideo = (uid: string) => {
        console.log('View video for UID:', uid);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = devices.slice(startIndex, startIndex + pageSize);



    return (


    <div className="allDeviceBig">
        <Row gutter={[16, 16]}>
            {devicesOnPage.map((device: any) => (
                <Col xs={24} sm={12} lg={8} key={device.ID}>
                    <CardComponentBig file={device} handleViewVideo={handleViewVideo}/>
                </Col>
            ))}
        </Row>
    </div>
)
    ;
};

export default AllDevicesBig;
