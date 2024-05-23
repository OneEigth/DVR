import React, {useState} from "react";
import "./style.css"
import VideoPlayer from "../../../videos/VideoPlayer";
import NavigationTimeLine from "../../../navigationTimeLine/NavigationTimeLine";
import ButtonCalendar from "../../../buttons/buttonCalendar/ButtonCalendar";
import CalendarModal from "../../../modals/calendare/CalendareModal";
import {useFileStore} from "../../../../store/devices/fileStore";
import {Device} from "../../../../types/Device";
import {useAuthStore} from "../../../../store/auth/auth";

interface PlayerPlaceProps {
    selectedOnlineUID: string,
    device: Device
}
const PlayerPlace: React.FC<PlayerPlaceProps> = ({selectedOnlineUID,device}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // State to store selected date
    const { selectedFileUID } = useFileStore();
    const { SmartDVRToken } = useAuthStore.getState();

    console.log("PlayerPlace " + device.UID)

    const getFilePlayUrl = (uid: string,authToken:string) => {
        /*return `http://45.141.76.30:8172/play/file/${uid}/${authToken}`;*/
        return `http://45.141.76.30:8172/play/stream/${uid}/${authToken}`
    };

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
    console.log()
    return(
        <div className="PlayerPlace">
            <div className="Player">
            <VideoPlayer src={getFilePlayUrl(device.UID, SmartDVRToken )} />
            <div className="navigateTimeLine">
               {/*<NavigationTimeLine selectedDate={selectedDate} deviceUID={device.UID}/>*/}
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