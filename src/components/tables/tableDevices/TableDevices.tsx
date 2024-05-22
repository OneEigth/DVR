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
import ButtonAddPlus from "../../buttons/buttonAddPlus/ButtonAddPlus";
import NewGroupModal from "../../modals/newGroup/NewGroupModal";
import NewDeviceModal from "../../modals/newDevice/NewDeviceModal";


const TableDevices: React.FC = () => {
    const {devices, fetchDevices} = useDevicesStore(); // Получаем список устройств и метод для загрузки
    const [currentPage, setCurrentPage] = useState<number>(1); // Состояние текущей страницы
    const [pageSize, setPageSize] = useState<number>(10); // Состояние размера страницы
    const [showLocationMap, setShowLocationMap] = useState<boolean>(false);
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('small');
    const [selectedUID, setSelectedUID] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState(false);


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


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="tableContainer">

            <div className="toolBar">
                <div className="leftSide">
                    <h1 className="device_h1">Устройства</h1>
                    <h1 className="count_h1">({devices.length})</h1>
                    <ButtonAddPlus onClick={showModal}/>
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
                {activeDeviceSize === 'medium' && <AllDevicesMedium onSelectDevice={handleSelectDevice} />}
                {activeDeviceSize === 'big' && <AllDevicesBig onSelectDevice={handleSelectDevice} />}
            </div>
            <NewDeviceModal
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div>
    )
};

export default TableDevices;
