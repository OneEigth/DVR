import React, {useEffect, useState} from "react";
import {ConfigProvider, Table} from "antd";
import { useDevicesStore } from '../../../../store/devices/fileDevicesFromDB';

const FileTable: React.FC = () => {
    const { files, fetchFiles } = useDevicesStore();
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        //логика
    };


    useEffect(() => {
        const deviceUID = 'e7727a41-d03d-3f36-b7a2-9ccf8c95dac5';
        const startDateTime = '2024-02-27T20:22:49+05:00';
        const endDateTime = '2024-12-14T23:59:59+05:00';
        fetchFiles(deviceUID, startDateTime, endDateTime);
    }, [fetchFiles]);

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
        },
        {
            title: 'Размер',
            dataIndex: 'size',
            key: 'size',
            width: '10%',
        },
        {
            title: 'Секретность',
            dataIndex: 'secret',
            key: 'secret',
            width: '10%',
        },
        {
            title: 'Дата/Время',
            dataIndex: 'date',
            key: 'date',
            width: '30%',
        }
    ];

      return (
        <div className="FileTable">
            <ConfigProvider
                theme={{
                    token: {
                       borderRadius:0
                    },
                }}
            >
                <Table
                    className="table"
                    columns={columns}
                    dataSource={files}
                    pagination={false}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                />
            </ConfigProvider>

        </div>
    );
}

export default FileTable;