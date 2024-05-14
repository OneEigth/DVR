import React, {useState} from "react";
import "./style.css"
import VideoPlayer from "../../../videos/VideoPlayer";
import {FILE_PLAY_URL} from "../../../../const/const";

import NavigationTimeLine from "../../../navigationTimeLine/NavigationTimeLine";
import ButtonCalendar from "../../../buttons/buttonCalendar/ButtonCalendar";
import CalendarModal from "../../../modals/CalendareModal";
import {useFileStore} from "../../../../store/devices/fileStore";


interface PlayerPlaceProps {
    selectedOnlineUID: string,
    device:any
}
const PlayerPlace: React.FC<PlayerPlaceProps> = ({selectedOnlineUID,device}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // State to store selected date
    const { selectedFileUID } = useFileStore();

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
            <VideoPlayer src={FILE_PLAY_URL(selectedFileUID)} />
            <div className="navigateTimeLine">
               <NavigationTimeLine selectedDate={selectedDate} deviceUID={device.UID}/>
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