import React, {useState} from "react";
import "./style.css"
import VideoPlayer from "../../../videos/VideoPlayer";
import {FILE_PLAY_URL, ONLINE_PLAY_URL, VIDEO_PREVIEW_URL} from "../../../../const/const";
import {Progress} from "antd";
import NavigationTimeLine from "../../../navigationTimeLine/NavigationTimeLine";
import ButtonCalendar from "../../../buttons/buttonCalendar/ButtonCalendar";
import CalendarModal from "../../../modals/CalendareModal";

interface PlayerPlaceProps {
    selectedOnlineUID: string,
    selectedFileUID:string,
}
const PlayerPlace: React.FC<PlayerPlaceProps> = ({ selectedOnlineUID,selectedFileUID }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // State to store selected date

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(false); // Close the modal after selecting a date
    };
    return(
        <div className="PlayerPlace">
            <div className="Player">
            {/*<img alt="" src={ONLINE_PLAY_URL(selectedOnlineUID)}/>*/}
            <VideoPlayer src={FILE_PLAY_URL(selectedFileUID)} />
            <div className="navigateTimeLine">
               <NavigationTimeLine />
                <div className="nav_buttons">
                    <ButtonCalendar onClick={handleOpenModal} selectedDate={selectedDate}/>
                </div>
                <CalendarModal
                    isModalOpen={isModalOpen}
                    handleOk={handleCloseModal}
                    handleCancel={handleCloseModal}
                    handleDateSelect={handleDateSelect} // Pass the handler to CalendarModal
                />
            </div>

            </div>

        </div>
    );
}
export default PlayerPlace;