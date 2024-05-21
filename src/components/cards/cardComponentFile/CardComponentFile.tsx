import React from "react";
import {Card} from 'antd';
import './style/style.css'
import {VIDEO_PREVIEW_URL} from "../../../const/const";
import {useFileStore} from "../../../store/devices/fileStore";
import {File} from "../../../types/File";
import {useAuthStore} from "../../../store/auth/auth";


interface CardComponentProps {
    file: File
}

const CardComponentFile: React.FC<CardComponentProps> = ({file}) => {
    const { setSelectedFileUID } = useFileStore();
    const { SmartDVRToken } = useAuthStore.getState();

    const handleDeviceClick = (FileUid: string) => {
        setSelectedFileUID(FileUid);

    };

    return (
        <div className="containerCardFile">
            <div className="coverFile">
                <Card
                    className="coverCardFile"
                    key={file.UID}
                    hoverable
                    cover={<img alt={''} src={VIDEO_PREVIEW_URL(file.UID, SmartDVRToken)}/>}
                    onClick={() => handleDeviceClick(file.UID)}
                />
            </div>
            <div className="propertiesFile">
                <h1 className="nameFile">
                    {file.start}
                </h1>
                <div className="propertyGroupFile">
                    <h3 className="propertyFile">{file.size}мБ</h3>
                    <h3 className="propertyFile">{file.fileType}</h3>
                </div>
            </div>
        </div>
    );
}

export default CardComponentFile;



