import React from "react";
import "./style.css"
import VideoPlayer from "../../../videos/VideoPlayer";

const PlayerPlace: React.FC = () => {
    return(
        <div className="PlayerPlace">
            <div className="Player">
            <VideoPlayer src={"http://178.91.130.237:7687/play/file/1b2bb3b6-d9f1-11ee-889a-005056010812"}/>

            </div>

        </div>
    );
}
export default PlayerPlace;