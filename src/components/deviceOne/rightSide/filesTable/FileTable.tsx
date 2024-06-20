import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import CardComponentFile from "../../../cards/cardComponentFile/CardComponentFile";
import {useFilesStore} from "../../../../store/devices/FilesDevicesFromDB";
import {Device} from "../../../../types/Device";
import {useAuthStore} from "../../../../store/auth/auth";
import {useFilterFileStore} from "../../../../store/devices/fileFilterStote";
import {useFileCurrentTypeStore} from "../../../../store/devices/fileCurrentType";
import {useFileSelectionStore} from "../../../../store/devices/useSelectedRowKeysFilesRS";
import './style.css'
import DeleteFilesDOF from "../../../modals/deleteFile/DeleteFilesDOF";
import {useButtonDeleteFromDOF} from "../../../../store/devices/useButtonsDeleteFromDOF";
import MoreDetails from "../../../modals/moreDetails/MoreDetalies";
import {useOpenMoreDetails} from "../../../../store/devices/useShowMoreDetails";


interface FileTableProps {
    device: Device;
}

interface FileData {
    deviceUID: string;
    start: string;
    end: string;
    rating?: number[];
}

const FileTableLazy: React.FC<FileTableProps> = ({ device }) => {
    const { fileFilterStore } = useFilterFileStore();
    const { files, fetchFiles, resetFiles,hasMore } = useFilesStore();
    const { user, SmartDVRToken } = useAuthStore();
    const { fileType } = useFileCurrentTypeStore();
    const { selectedFiles, setSelectedFiles } = useFileSelectionStore();
    const { isDeleteDeviceModal, setIsDeleteDeviceModal } = useButtonDeleteFromDOF();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const { openMoreDetails, setOpenMoreDetails } = useOpenMoreDetails();

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const handleCheckboxChange = (fileId: string, checked: boolean) => {
        // Your logic for handling checkbox change
    };

    const fetchFilteredFiles = useCallback(async () => {
        const deviceUID = device.UID;
        let dateStart = "2024-02-27T20:22:49+05:00";
        let dateEnd = "2024-12-14T23:59:59+05:00";
        let rating: number[] = [];

        if (fileFilterStore) {
            dateStart = fileFilterStore.dateStart || dateStart;
            dateEnd = fileFilterStore.dateEnd || dateEnd;
            if (fileFilterStore.rating.length > 0) {
                rating = fileFilterStore.rating.map(Number);
            }
        }

        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);
        const isoStartDate = startDate.toISOString();
        const isoEndDate = endDate.toISOString();

        const fileData: FileData = {
            deviceUID,
            start: isoStartDate,
            end: isoEndDate,
            rating: rating.length > 0 ? rating : undefined,
        };

        if (user && SmartDVRToken) {
            setIsLoading(true);
            await fetchFiles(fileData, user.login, SmartDVRToken, page, pageSize);
            setIsLoading(false);
        }
    }, [device, fileFilterStore, fetchFiles, SmartDVRToken, user, page, pageSize]);

    useEffect(() => {
        fetchFilteredFiles();
    }, [fetchFilteredFiles]);

    useEffect(() => {
        if (inView && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, isLoading]);

    useEffect(() => {
        setPage(1);
        resetFiles();
    }, [device, fileFilterStore, fileType, resetFiles]);

    const filteredFiles = fileType === "all" ? files : files.filter((file: any) => file.fileType === fileType);

    const handleOkDeleteFileModal = () => {
        setIsDeleteDeviceModal(false);
        useFileSelectionStore.getState().clearSelectedFiles();
        fetchFilteredFiles(); // Обновляем список файлов после удаления
    };

    const handleCancelDeleteFileModal = () => {
        setIsDeleteDeviceModal(false);
    };
    const onCloseMoreDetails = () => {
        setOpenMoreDetails(false);
    };

    const onOkMoreDetails = () => {
        setOpenMoreDetails(false);
    };

    return (
        <div className="FileTable">
            <div className="allDevice">
                {filteredFiles.map((file: any, index: number) => (
                    <CardComponentFile
                        key={file.ID}
                        file={file}
                        isSelected={!!selectedFiles[file.UID]}
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))}
                {hasMore && <div ref={ref} style={{ height: '1px' }} />}
            </div>
            {isLoading && <div>Loading...</div>}
            <DeleteFilesDOF visible={isDeleteDeviceModal} files={selectedFiles} onOk={handleOkDeleteFileModal} onCancel={handleCancelDeleteFileModal} />
            <MoreDetails
                onOk={onOkMoreDetails}
                open={openMoreDetails}
                onCancel={onCloseMoreDetails}
            />
        </div>
    );
};
export default FileTableLazy;