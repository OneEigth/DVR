import React, { useEffect, useState } from "react";
import { useDevicesStore } from "../../../../store/devices/fileDevicesFromDB";
import CardComponent from "../../../cards/cardComponentMedium/CardComponent";
import CardComponentFile from "../../../cards/cardComponentFile/CardComponentFile";

interface FileTableProps {
    deviceUID:string,
    startDateTime:string,
    endDateTime:string,
}
const FileTable: React.FC = () => {
    const { files, fetchFiles } = useDevicesStore();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    useEffect(() => {
        const deviceUID = "e7727a41-d03d-3f36-b7a2-9ccf8c95dac5";
        const startDateTime = "2024-02-27T20:22:49+05:00";
        const endDateTime = "2024-12-14T23:59:59+05:00";
        fetchFiles(deviceUID, startDateTime, endDateTime);
    }, [fetchFiles]);

    const handleViewVideo = (uid: string) => {
        console.log("View video for UID:", uid);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const devicesOnPage = files.slice(startIndex, startIndex + pageSize);

    return (
        <div className="FileTable">
            <div className="allDevice">
                {devicesOnPage.map((file: any) => (
                    <CardComponentFile
                        key={file.ID}
                        file={file}
                        handleViewVideo={handleViewVideo}
                    />
                ))}
            </div>
        </div>
    );
};

export default FileTable;
