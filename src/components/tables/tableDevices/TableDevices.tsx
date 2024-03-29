import React, {useEffect, useState} from 'react';
import {Divider, message, Modal, Space, Table} from 'antd';
import {useDevicesStore} from '../../../store/devices/allDevices';
import './style/style.css'
import Pagin from "../../pagination/pagin";
import SearchInput from "../../searchInput/SearchInput";
import Buttonsfilter from "../../buttons/buttonFilter/Buttonsfilter";
import ButtonPlay from "../../buttons/buttonPlay/ButtonPlay";

const TableDevices: React.FC = () => {
    const {devices, fetchDevices} = useDevicesStore(); // Получаем список устройств и метод для загрузки
    const [currentPage, setCurrentPage] = useState<number>(1); // Состояние текущей страницы
    const [pageSize, setPageSize] = useState<number>(10); // Состояние размера страницы
    const [selectedUID, setSelectedUID] = useState<string | null>(null); // Состояние для отслеживания выбранного UID
    const [modalVisible, setModalVisible] = useState<boolean>(false); // Состояние для отображения модального окна



    useEffect(() => {
        fetchDevices(); // Вызываем метод fetchDevices при монтировании компонента
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
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <ButtonPlay onClick={() => handlePlayClick(record.UID, record.online)} />
                </Space>
            ),
        },
    ];


    const startIndex = (currentPage - 1) * pageSize;

    // Отображаем только устройства на текущей странице
    const devicesOnPage = devices.slice(startIndex, startIndex + pageSize);

    const handlePlayClick = (uid: string, online: boolean) => {
        if (online) {
            setSelectedUID(uid); // Устанавливаем выбранный UID
            setModalVisible(true); // Показываем модальное окно
        } else {
            // Если устройство офлайн, не открываем модальное окно
            console.log('This device is offline');
            message.warning('Устройство не онлайн');
        }
    };

    const handleModalCancel = () => {
        setSelectedUID(null); // Сбрасываем выбранный UID
        setModalVisible(false); // Скрываем модальное окно
    };

    return (
        <div className="tableContainer">

                <div className="toolBar">
                    <div className="leftSide">
                        <h1>Камеры</h1>
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


            <div className="tablePlace">
                <Table className="table" columns={columns} dataSource={devicesOnPage} pagination={false}/>
            </div>

            <Modal
                className="modal"
                title="Play Video"
                visible={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                {selectedUID && <img className="img" src={`http://178.91.130.237:7687/play/online/${selectedUID}`} alt="img" />}
            </Modal>
        </div>
    )
};

export default TableDevices;
