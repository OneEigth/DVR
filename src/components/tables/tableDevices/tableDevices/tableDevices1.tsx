import React, {useEffect, useState} from 'react';
import {useDevicesStore} from '../../../../store/devices/allDevices'
import './style/style.css';
import 'leaflet/dist/leaflet.css';
import CardComponent from '../../../cards/CardComponent';
import {Card, Col, Row} from "antd";
import devicesData from './allDevices.json';


const TableDevices1: React.FC = () => {
/*
    const {devices, fetchDevices} = useDevicesStore(); // Получаем список устройств и метод для загрузки
*/
    const [currentPage, setCurrentPage] = useState<number>(1); // Состояние текущей страницы
    const [pageSize, setPageSize] = useState<number>(10); // Состояние размера страницы
    const [showLocationMap, setShowLocationMap] = useState<boolean>(false);

    const [devices, setDevices] = useState<any[]>([]); // Состояние для хранения данных устройств



    /* useEffect(() => {
         fetchDevices();
     }, []);*/

    useEffect(() => {
        // Инициализация данных устройств из файла
        setDevices(devicesData.data);
    }, []);

    const handleViewVideo = (uid: string) => {
        // Реализуйте логику открытия видео по UID
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
        <Card className="allDevice">
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
        </Card>
    );
};

export default TableDevices1;
