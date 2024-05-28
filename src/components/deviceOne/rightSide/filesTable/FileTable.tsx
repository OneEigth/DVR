

import React, { useEffect, useState } from "react";
import CardComponentFile from "../../../cards/cardComponentFile/CardComponentFile";
import { useSelectedFilesStore } from "../../../../store/devices/SelectedFilesState"
import {useFilesStore} from "../../../../store/devices/fileDevicesFromDB";
import {Device} from "../../../../types/Device";
import {Pagination, PaginationProps} from "antd";
import {useAuthStore} from "../../../../store/auth/auth";

interface FileTableProps {
    device:Device;
}
const FileTable: React.FC<FileTableProps> = ({device}) => {
    const { selectedFiles } = useSelectedFilesStore();
    const {files,fetchFiles}=useFilesStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(7);


    /*useEffect(() => {
        if (selectedDate) {


            // Корректировка на локальный часовой пояс
            const localDate = new Date(selectedDate);
            const adjustedDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

            // Устанавливаем начало выбранного дня
            const start = new Date(adjustedDate);
            start.setHours(-19, 0, 0, 0);

            // Устанавливаем конец выбранного дня
            const end = new Date(adjustedDate);
            end.setHours(4, 59, 59, 999);

            // Форматируем даты для запроса
            const formattedStart = start.toISOString().split('.')[0] + '+05:00';
            const formattedEnd = end.toISOString().split('.')[0] + '+05:00';

            setStartDateTime(start);

            setEndDateTime(end);


            fetchFiles(deviceUID, formattedStart, formattedEnd);
        }
    }, [selectedDate, fetchFiles]);*/




    //все медиа файлы выбранного устройства
    useEffect(() => {
        const deviceUID = device.UID;
        const startDateTime = "2024-02-27T20:22:49+05:00";
        const endDateTime = "2024-12-14T23:59:59+05:00";
        fetchFiles(deviceUID, startDateTime, endDateTime);
    }, [device, fetchFiles]);

    console.log("SelectedFiles "+selectedFiles)

    /*//видео файлы выбранные с NavigationTimeLine
    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = selectedFiles.slice(startIndex, startIndex + pageSize);*/

    //все медиа файлы выбранного устройства по странично
    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = files.slice(startIndex, startIndex + pageSize);
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="FileTable">
            <div className="allDevice">
                {/*<Pagination
                    size="small"
                    total={files.length}
                    showTotal={showTotal}
                    pageSize={pageSize}
                    pageSizeOptions={[7]}
                    defaultPageSize={7}
                    onChange={handlePageChange}
                    current={currentPage}
                    showSizeChanger={false}
                />*/}
                {devicesOnPage.map((files: any) => (
                    <CardComponentFile
                        key={files.ID}
                        file={files}

                    />
                ))}
            </div>
        </div>
    );
};

export default FileTable;
