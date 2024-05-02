import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'antd';
import { useDevicesStore } from '../../../store/devices/fileDevicesFromDB';
import './styles/style.css';
import {VIDEO_PREVIEW_URL} from "../../../const/const";


const TableFileDeviceDB: React.FC = () => {
    const { files, fetchFiles } = useDevicesStore();
    const [selectedVideoUID, setSelectedVideoUID] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gridSize, setGridSize] = useState<number>(6); // Размер сетки, начальное значение 6
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

    return (
        <div className="Container">
            <Row gutter={[16, 16]}>
                {paginatedFiles.map((file: any) => (

                    <Col key={file.id} span={24 / gridSize}>
                        <Card
                            key={file.id}
                            hoverable
                            cover={<img alt={''} src={VIDEO_PREVIEW_URL(file.UID)} />}
                            onClick={() => handleViewVideo(file.UID)}
                        >
                            <Card.Meta title={file.id} />
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination
                style={{ marginTop: '16px', textAlign: 'center' }}
                current={currentPage}
                pageSize={pageSize}
                total={files.length}
                onChange={onPageChange}
                showSizeChanger={false}
            />

        </div>
    );
};

export default TableFileDeviceDB;
