import React from "react";
import "./style.css"
import VideoPlayer from "../../../videos/VideoPlayer";
import {Device} from "../../../../types/Device";
import {useAuthStore} from "../../../../store/auth/auth";
import {ONLINE_PLAY_URL} from "../../../../const/const";
import {useOnlineStateStream} from "../../../../store/devices/onlineStream";
import foto from './Video.png'

interface PlayerPlaceProps {
    device: Device | null;
}
const PlayerPlace: React.FC<PlayerPlaceProps> = ({device}) => {
    const { SmartDVRToken } = useAuthStore.getState();

    const {isStreamOnline}=useOnlineStateStream();



    const getFilePlayUrl = (uid: string, authToken: string) => {
        if (!device || !authToken) return "";
        const playOnline= `${ONLINE_PLAY_URL}${uid}/${authToken}`;

        if(device && isStreamOnline && device.online){

        return playOnline
        }

    };

    const videoSrc = device ? getFilePlayUrl(device.UID, SmartDVRToken) : "";

    return(
        <div className="PlayerPlace">
            {videoSrc ? (
                <iframe
                    width="100%"
                    height="400px"
                    src={videoSrc}
                    scrolling="no"
                    frameBorder="0"
                    style={{ borderWidth: '0px' }}
                />
            /*<VideoPlayer src={videoSrc} device={device} />*/
            ) : (
                <div className="noVideo">
                    <img src={foto} alt=''/>
                </div>
            )}
        </div>
    );
}
export default PlayerPlace;