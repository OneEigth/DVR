import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import CardComponentFile from "../../../cards/cardComponentFile/CardComponentFile";
import { Device } from "../../../../types/Device";
import { useAuthStore } from "../../../../store/auth/auth";
import { useFileCurrentTypeStore } from "../../../../store/devices/fileCurrentType";
import { useFileSelectionStore } from "../../../../store/devices/useSelectedRowKeysFilesRS";
import './style.css';
import DeleteFilesDOF from "../../../modals/deleteFile/DeleteFilesDOF";
import { useButtonDeleteFromDOF } from "../../../../store/devices/useButtonsDeleteFromDOF";
import MoreDetails from "../../../modals/moreDetails/MoreDetalies";
import { useOpenMoreDetails } from "../../../../store/devices/useShowMoreDetails";
import { useFilesStore } from "../../../../store/devices/FilesDevicesFromDB";
import {useFilterFileStore} from "../../../../store/devices/fileFilterStote";

interface FileTableProps {
    device: Device;
}

const FileTableLazy2: React.FC<FileTableProps> = ({ device }) => {
    const { files, fetchFiles, resetFiles, hasMore } = useFilesStore();
    const { fileFilterStore } = useFilterFileStore();
    const { user, SmartDVRToken } = useAuthStore();
    const { fileType } = useFileCurrentTypeStore();
    const { selectedFiles } = useFileSelectionStore();
    const { isDeleteDeviceModal, setIsDeleteDeviceModal } = useButtonDeleteFromDOF();
    const [page, setPage] = useState(1);
    const [pageSize] = useState(15);
    const [isLoading, setIsLoading] = useState(false);
    const { openMoreDetails, setOpenMoreDetails } = useOpenMoreDetails();
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const handleCheckboxChange = (fileId: string, checked: boolean) => {
        // Your logic for handling checkbox change
    };

        /*const fetchFilteredFiles = useCallback(async () => {
            if (user && SmartDVRToken) {
                setIsLoading(true);
                await fetchFiles(fileDAtaSmartDVRToken, user.login, page, pageSize, device.UID);
                setIsLoading(false);
            }
        }, [device.UID, fetchFiles, SmartDVRToken, user, page, pageSize, fileType]);*/

      /*  useEffect(() => {
            if (page > 1) {
                fetchFilteredFiles();
            }
        }, [page, fetchFilteredFiles]);

    useEffect(() => {
        resetFiles();
        setPage(1);
    }, [device, fileType, resetFiles]);

    useEffect(() => {
        fetchFilteredFiles();
    }, [fetchFilteredFiles]);*/

    useEffect(() => {
        if (inView && !isLoading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, isLoading, hasMore]);


    // Log the files to debug
    useEffect(() => {
        console.log("Files updated:", files);
    }, [files]);

/*    const handleOkDeleteFileModal = () => {
        setIsDeleteDeviceModal(false);
        useFileSelectionStore.getState().clearSelectedFiles();
        fetchFilteredFiles(); // Обновляем список файлов после удаления
    };*/

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
                {files.length === 0 && !isLoading && <div>No files available</div>}
                {files.map((file: any) => (
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
            {/*<DeleteFilesDOF visible={isDeleteDeviceModal} files={selectedFiles} onOk={handleOkDeleteFileModal} onCancel={handleCancelDeleteFileModal} />*/}
            <MoreDetails
                onOk={onOkMoreDetails}
                open={openMoreDetails}
                onCancel={onCloseMoreDetails}
            />
        </div>
    );
};

export default FileTableLazy2;
