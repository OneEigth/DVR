import React from "react";
import {Card} from 'antd';
import {useNavigate} from 'react-router-dom';
import './style/style.css'

import {VIDEO_PREVIEW_URL} from "../../../const/const";
import {useFileStore} from "../../../store/devices/fileStore";


interface CardComponentProps {
    file: {
        UID: string,
        deviceUID: string,
        deviceDID: string,
        groupUID: string,
        ownerUID: string,
        rating: string,
        name: string,
        size: string,
        start: string,
        end: string,
        duration: string,
        downloaded: boolean,
        storagePath: string,
        previewPath: string,
        tryDownloadCount: number,
        fileType: string,
        caseNumber: number,
        caseDescription: string,
        attached: string
    };
    handleViewVideo: (uid: string) => void;

}

const CardComponentFile: React.FC<CardComponentProps> = ({file, handleViewVideo}) => {
    const { setSelectedFileUID } = useFileStore();


    const handleDeviceClick = (FileUid: string) => {
        setSelectedFileUID(FileUid);
        console.log('CardComponentFile FileUid '+ FileUid)
    };

    return (
        <div className="containerCardFile">
            <div className="coverFile">
                <Card
                    className="coverCardFile"
                    key={file.UID}
                    hoverable
                    cover={<img alt={''} src={VIDEO_PREVIEW_URL(file.UID)}/>}
                    onClick={() => handleDeviceClick(file.UID)}
                />
            </div>
            <div className="propertiesFile">
                <h1 className="nameFile">
                    {file.start}
                </h1>
                <div className="propertyGroupFile">
                    <h3 className="propertyFile">{file.size}мБ</h3>

                </div>
            </div>

        </div>
    );
}

export default CardComponentFile;



