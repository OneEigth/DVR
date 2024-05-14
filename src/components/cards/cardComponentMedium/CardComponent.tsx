import React from "react";
import {Card} from 'antd';
import {useNavigate} from 'react-router-dom';
import './style/style.css';
import {ONLINE_PLAY_URL} from "../../../const/const";
import IconOnline from "../../icons/iconOnline/IconOnline";
import IconOffline from "../../icons/iconOffline/IconOffline";
import {useSelectedDevice} from "../../../store/devices/SelectedDevice";
import {Device} from "../../../types/Device";


interface CardComponentProps {
    file: Device;
    handleViewVideo: (uid: string) => void;

}


const CardComponent: React.FC<CardComponentProps> = ({file, handleViewVideo}) => {
    const navigate = useNavigate();
    const {setSelectedDevice} = useSelectedDevice();
    const handleDeviceClick = (deviceUID: string) => {
        navigate(`/device/${deviceUID}`);
        setSelectedDevice(file);
    };

    return (
        <div className="containerCard">
            <div className="cover">
                <Card
                    className="coverCard"
                    key={file.ID}
                    hoverable
                    cover={<img alt={''} /*src={ONLINE_PLAY_URL(file.UID)}*//>}
                    onClick={() => handleDeviceClick(file.UID)}
                />
            </div>

                <div className="propertiesPart1">
                    <h1 className="name">
                        <div className="icon">{file.online ? <IconOnline/> : <IconOffline/>}</div>
                        {file.name}
                    </h1>
                    <div className="propertyGroup">
                        <h3 className="property">Группа {file.groupUID}</h3>
                    <h3 className="property">Модель {file.model}</h3>
                    <h3 className="property">Серийный номер {file.DID}</h3>
                    <h3 className="property">Сотрудник {file.ownerUID}</h3>
                    </div>
                </div>

        </div>
    );
}

export default CardComponent;


/*
<div
    className="containerCard">
    <div className="cover">
        <Card
            className="coverCard"
            key={file.id}
            hoverable
            cover={<img alt={''} src={ONLINE_PLAY_URL(file.UID)}/>}
            onClick={() => handleDeviceClick(file.id)}
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
</div>*/
