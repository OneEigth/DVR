import React from "react";
import {Card} from 'antd';
import {useNavigate} from 'react-router-dom';
import './style/style.css';
import {ONLINE_PLAY_URL, VIDEO_PREVIEW_URL} from "../../../const/const";
import IconOnline from "../../icons/iconOnline/IconOnline";
import IconOffline from "../../icons/iconOffline/IconOffline";

interface CardComponentProps {
    file: {
        id: string;
        UID: string;
        DID: string;
        battery_percent: number;
        ownerUID: string;
        online: boolean;
        groupUID:string;
        model:string;
        name:string;
    };
    handleViewVideo: (uid: string) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({file, handleViewVideo}) => {
    const navigate = useNavigate();
    const handleDeviceClick = (deviceId: string) => {
        navigate(`/device/${deviceId}`);
    };

    return (
        <div className="containerCardBig">
            <div className="coverBig">
                <Card
                    className="coverCardBig"
                    key={file.id}
                    hoverable
                    cover={<img alt={''} src={VIDEO_PREVIEW_URL(file.UID)}/>}
                    onClick={() => handleDeviceClick(file.id)}
                />
            </div>
            <div className="propertiesBig">
                <h1 className="name">
                    <div className="icon">{file.online ? <IconOnline/> : <IconOffline/>}</div>
                    {file.name}
                </h1>
            </div>

        </div>
    );
}

export default CardComponent;