import React from "react";
import { Card } from 'antd';
import './style/style.css';
import {ONLINE_PLAY_URL} from "../../const/const";

interface CardComponentProps {
    file: {
        id: string;
        UID: string;
        DID: string;
        battery_percent: number;
        ownerUID: string;
        online: boolean;
    };
    handleViewVideo: (uid: string) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ file, handleViewVideo }) => {

    return (
        <div className="containerCard">
            <div className="cover">
                <Card
                    className="coverCard"
                    key={file.id}
                    hoverable
                    cover={<img alt={''} src={ONLINE_PLAY_URL(file.UID)} />}
                    onClick={() => handleViewVideo(file.UID)}
                />
            </div>
            <div className="properties">
                <div className="propertiesPart1">
                    <a className="property">id:{file.id}</a>
                    <a className="property">UID:{file.UID}</a>
                    <a className="property">DID:{file.DID}</a>
                </div>
                <div className="propertiesPart2">
                    <a className="property">Battery:{file.battery_percent}%</a>
                    <a className="property">ownerUID:{file.ownerUID}</a>
                    <a className="property">Online:{file.online ? 'Yes' : 'No'}</a>
                </div>
            </div>
        </div>
    );
}

export default CardComponent;
