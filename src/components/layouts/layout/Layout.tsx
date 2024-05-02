import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'antd';
import { useDevicesStore } from '../../../store/devices/fileDevicesFromDB';
import './style.css';
import {FILE_PLAY_URL} from "../../../const/const";

const TableFileDeviceDB: React.FC = () => {
    const { files, fetchFiles } = useDevicesStore();
    const [selectedVideoUID, setSelectedVideoUID] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gridSize, setGridSize] = useState<number>(4); // Начальное значение 4 для 2x2 раскладки
    const pageSize = gridSize * gridSize; // Количество элементов на странице

    useEffect(() => {
        const deviceUID = 'e7727a41-d03d-3f36-b7a2-9ccf8c95dac5';
        const startDateTime = '2024-02-27T20:22:49+05:00';
        const endDateTime = '2024-12-14T23:59:59+05:00';
        fetchFiles(deviceUID, startDateTime, endDateTime);
    }, [fetchFiles]);

    const handleViewVideo = (uid: string) => {
        setSelectedVideoUID(uid);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedVideoUID('');
        setModalVisible(false);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const changeGridSize = (size: number) => {
        setGridSize(size);
        setCurrentPage(1);
    };

    const paginatedFiles = files.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const renderGrid = () => {
        const gridLayout = [];
        for (let i = 0; i < gridSize; i++) {
            const rowLayout = [];
            for (let j = 0; j < gridSize; j++) {
                const fileIndex = i * gridSize + j;
                const file = paginatedFiles[fileIndex];
                rowLayout.push(
                    <Col key={file?.id} span={24 / gridSize}>
                        {file && (
                            <Card
                                hoverable
                                cover={<img alt={''} src={FILE_PLAY_URL(file.UID)} />}
                                onClick={() => handleViewVideo(file.UID)}
                            >
                                <Card.Meta title={file.id} />
                            </Card>
                        )}
                    </Col>
                );
            }
            gridLayout.push(<Row gutter={[16, 16]} key={i}>{rowLayout}</Row>);
        }
        return gridLayout;
    };

    return (
        <div className="Container">
            {/*<Button onClick={() => changeGridSize(2)}>2x2</Button>
            <Button onClick={() => changeGridSize(3)}>3x3</Button>
            <Button onClick={() => changeGridSize(4)}>4x4</Button>
            {renderGrid()}
            <Pagination
                style={{ marginTop: '16px', textAlign: 'center' }}
                current={currentPage}
                pageSize={pageSize}
                total={files.length}
                onChange={onPageChange}
                showSizeChanger={false}
            />
            <VideoModal uid={selectedVideoUID} visible={modalVisible} onClose={handleCloseModal} />*/}

            <div className="cards" style={{height:'500px', width:'500px'}}>

            </div>
        </div>
    );
};

export default TableFileDeviceDB;
