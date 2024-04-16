import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import {useDevicesStore} from '../../../store/devices/allDevices';
import './style/style.css'
import Pagin from "../../pagination/pagin";
import SearchInput from "../../searchInput/SearchInput";
import Buttonsfilter from "../../buttons/buttonFilter/Buttonsfilter";
import 'leaflet/dist/leaflet.css';
import SwitchMap from "../../switch/switchMap";
import TableDeviceShort from "./tableDeviceShort/TableDeviceShort";
import TableDevices1 from "./tableDevices/tableDevices1";

const TableDevices: React.FC = () => {
    const {devices, fetchDevices} = useDevicesStore(); // Получаем список устройств и метод для загрузки
    const [currentPage, setCurrentPage] = useState<number>(1); // Состояние текущей страницы
    const [pageSize, setPageSize] = useState<number>(10); // Состояние размера страницы
    const [showLocationMap, setShowLocationMap] = useState<boolean>(false);

    useEffect(() => {
        fetchDevices();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'UID',
            dataIndex: 'UID',
            key: 'UID',
        },
        {
            title: 'DID',
            dataIndex: 'DID',
            key: 'DID',
        },
        {
            title: 'Pulse Time',
            dataIndex: 'pulse_time',
            key: 'pulse_time',
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
        },
        {
            title: 'Battery Percent',
            dataIndex: 'battery_percent',
            key: 'battery_percent',
        },
        {
            title: 'Owner UID',
            dataIndex: 'ownerUID',
            key: 'ownerUID',
        },
        {
            title: 'online',
            dataIndex: 'online',
            key: 'online',
            render: (online: boolean) => (online ? 'Да' : 'Нет'),
        },

    ];

    const startIndex = (currentPage - 1) * pageSize;

    // Отображаем только устройства на текущей странице
    const devicesOnPage = devices.slice(startIndex, startIndex + pageSize);

    const handleSwitchChange = (isChecked: boolean) => {
        setShowLocationMap(isChecked);
    };

    return (
        <div className="tableContainer">

                <div className="toolBar">
                    <div className="leftSide">
                        <h1>Карта</h1>
                        <SwitchMap onChange={handleSwitchChange}/>
                    </div>

                    <div className="centr">
                        <Pagin
                            devices={devices}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            setCurrentPage={setCurrentPage}
                            setPageSize={setPageSize}
                        />
                    </div>
                    <div className="rightSide">
                        <div><SearchInput/></div>
                        <div><Buttonsfilter/></div>
                    </div>
                </div>

            {showLocationMap ? (
                <div className="MapPlace">
                        <TableDeviceShort/>
                </div>
            ) : (
                <div className="tablePlace">
                    <TableDevices1/>
                </div>
            )}

        </div>
    )
};

export default TableDevices;
