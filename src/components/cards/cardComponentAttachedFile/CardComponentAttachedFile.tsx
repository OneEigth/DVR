import React, { useState} from "react";
import {Button, Card} from 'antd';
import './style/style.css'
import {useFileStore} from "../../../store/devices/fileStore";
import {File} from "../../../types/File";
import {useAuthStore} from "../../../store/auth/auth";
import {useOnlineStateStream} from "../../../store/devices/onlineStream";
import {DownloadOutlined} from '@ant-design/icons'
import {SizeType} from "antd/es/config-provider/SizeContext";

import {useFileSelectionStore} from "../../../store/devices/useSelectedRowKeysFilesRS";
import {useOpenMoreDetails} from "../../../store/devices/useShowMoreDetails";

import IconDelete2 from "../../icons/iconDelete/IconDelete2";
import IconDwnLoad from "../../icons/iconDownload/IconDwnLoad";

interface CardComponentProps {
    file: File;
    isSelected: boolean;
    onCheckboxChange: (fileId: string, checked: boolean) => void;
}

const CardComponentAttachedFile: React.FC<CardComponentProps> = ({file}) => {
    const { setSelectedFileUID } = useFileStore();
    const { user,SmartDVRToken } = useAuthStore.getState();
    const {setIsStreamOnline}=useOnlineStateStream();
    const [previewUrlVideo, setPreviewUrlVideo] = useState<string>('');
    const [previewUrlJpg, setPreviewUrlJpg] = useState<string>('');
    const [size, setSize] = useState<SizeType>('middle');
    const {selectedFiles, setSelectedFiles}=useFileSelectionStore();
    const {openMoreDetails, setOpenMoreDetails} = useOpenMoreDetails();


    const handleDeviceClick = (FileUid: string) => {
        setSelectedFileUID(FileUid);
        setIsStreamOnline(false);
    };

    const handleCheckboxChange = (fileId: string, checked: boolean) => {
        setSelectedFiles(fileId, checked);
    };

    const handleChangeUrgent =() => {
    };

    const showDrawerMoreDetails = () => {
        setOpenMoreDetails(true);
    };
    const handleDelete = () => {
        setOpenMoreDetails(true);
    };
    const handleDownload= () => {
        setOpenMoreDetails(true);
    };

    return (

        <div className="containerAttachedFile">

            <div className="container_cover">
              <div className="cover">
              </div>
               <h1 className="h1_attachedFileName">{file.name}</h1>
            </div>

             <div className="buttons">
                 <IconDwnLoad  onClick={handleDownload}/>
                 <IconDelete2 style={{marginLeft:8}} onClick={handleDelete}/>
             </div>

        </div>
    );
}

export default CardComponentAttachedFile;



