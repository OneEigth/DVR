import React, { useState} from 'react';
import './style/style.css'
import Buttonsfilter from "../../buttons/buttonFilter/Buttonsfilter";
import 'leaflet/dist/leaflet.css';

import AllDevicesMedium from "./tableDevices/medium/AllDevicesMedium";
import AllDevicesBig from "./tableDevices/big/AllDeviceBig";
import AllDevicesSmall from "./tableDevices/small/AllDeviceSmall";
import ButtonAddPlus from "../../buttons/buttonAddPlus/ButtonAddPlus";
import NewDeviceModal from "../../modals/newDevice/NewDeviceModal";
import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import {useSelectedDeviceCount} from "../../../store/devices/useSelectedDevices";


const TableDevices: React.FC = () => {
    const [activeDeviceSize, setActiveDeviceSize] = useState<'small' | 'medium' | 'big'>('small');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const {selectedDeviceCount}=useSelectedDeviceCount()


    const handleFilterButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveDeviceSize(size);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="TableDevice_root">

            <div className="tableContainer">
                <div className="toolBar">
                    <div className="leftSide">
                        <h1 className="device_h1">Устройства</h1>
                        <h1 className="count_h1">({selectedDeviceCount})</h1>
                        <ButtonAddPlus onClick={showModal}/>
                    </div>

                    <div className="centr">

                    </div>
                    <div className="rightSide">
                        <div>
                            <Input
                                placeholder="поиск"
                                className="Search_input_Table"
                                suffix={<SearchOutlined />}
                                style={{ width: '100%', height: '32px' }}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)} // Обновляем состояние текста поиска
                            />
                        </div>
                        <Buttonsfilter onFilterButtonClick={handleFilterButtonClick}/>
                    </div>
                </div>

                <div className="tablePlace">
                    {activeDeviceSize === 'small' && <AllDevicesSmall searchText={searchText}/>}
                    {activeDeviceSize === 'medium' && <AllDevicesMedium searchText={searchText}/>}
                    {activeDeviceSize === 'big' && <AllDevicesBig searchText={searchText}/>}
                </div>
                <NewDeviceModal
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    )
};

export default TableDevices;
