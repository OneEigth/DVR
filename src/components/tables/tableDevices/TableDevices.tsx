import React, {useEffect, useState} from 'react';

import {useDevicesStore} from '../../../store/devices/allDevices';
import './style/style.css'
import Pagin from "../../pagination/pagin";
import SearchInput from "../../searchInput/SearchInput";
import Buttonsfilter from "../../buttons/buttonFilter/Buttonsfilter";
import 'leaflet/dist/leaflet.css';

import AllDevicesMedium from "./tableDevices/medium/AllDevicesMedium";
import AllDevicesBig from "./tableDevices/big/AllDeviceBig";
import AllDevicesSmall from "./tableDevices/small/AllDeviceSmall";


const TableDevices: React.FC = () => {
    const {devices, fetchDevices} = useDevicesStore(); // Получаем список устройств и метод для загрузки
    const [currentPage, setCurrentPage] = useState<number>(1); // Состояние текущей страницы
    const [pageSize, setPageSize] = useState<number>(10); // Состояние размера страницы
    const [showLocationMap, setShowLocationMap] = useState<boolean>(false);
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('small');
    const [selectedUID, setSelectedUID] = useState<string>();


    useEffect(() => {
        fetchDevices();
    }, []);



    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = devices.slice(startIndex, startIndex + pageSize);


    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };

    const handleSelectDevice = (UID: string) => {
        setSelectedUID(UID);
    };

    return (
        <div className="tableContainer">

            <div className="toolBar">
                <div className="leftSide">
                    {/*<h1>Карта</h1>
                    <SwitchMap onChange={handleSwitchChange}/>*/}
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
                    <Buttonsfilter onFilterButtonClick={handleFilterButtonClick} />
                </div>
            </div>
            <div className="tablePlace">
                {activeDeviceSize === 'small' && <AllDevicesSmall onSelectDevice={handleSelectDevice} />}
                {activeDeviceSize === 'medium' && <AllDevicesMedium />}
                {activeDeviceSize === 'big' && <AllDevicesBig />}
            </div>
        </div>
    )
};

export default TableDevices;
