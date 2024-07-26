import React from "react";
import "./style.css"
import VideoPlayer from "../../../videos/VideoPlayer";
import {Device} from "../../../../types/Device";
import {useAuthStore} from "../../../../store/auth/auth";
import {FILE_PLAY_URL, ONLINE_PLAY_URL} from "../../../../const/const";
import {useFileStore} from "../../../../store/devices/fileStore";
import {useOnlineStateStream} from "../../../../store/devices/onlineStream";

interface PlayerPlaceProps {
    device: Device
}
const PlayerPlace: React.FC<PlayerPlaceProps> = ({device}) => {
    const { SmartDVRToken } = useAuthStore.getState();
    const { selectedFileUID, setSelectedFileUID } = useFileStore();
    console.log("PlayerPlace " + device.UID)
    const {isStreamOnline}=useOnlineStateStream();

    console.log("статус: "+selectedFileUID)

    const getFilePlayUrl = (uid: string, authToken: string) => {

        const playOnline= `${ONLINE_PLAY_URL}${uid}/${authToken}`;

        if(isStreamOnline && device.online){

        return playOnline
        }

    };



    return(
        <div className="PlayerPlace">
            <VideoPlayer src={getFilePlayUrl(device.UID, SmartDVRToken )} device={device} />
        </div>
    );
}
export default PlayerPlace;