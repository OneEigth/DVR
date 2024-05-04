// NavigationTimeLine.tsx

import React, { memo, useState } from 'react';
import TimeMarkers from '../../components/videos/Controls/TimeMarkers';
import './style/style.css';
import ButtonCalendar from '../buttons/buttonCalendar/ButtonCalendar';
import CalendarModal from '../modals/CalendareModal';

const NavigationTimeLine: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to store selected date

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

    return (
        <div className="nav_controle">
            <div className="Nav-progress">
                <div className="Nav-progress__range">
                    <TimeMarkers/>
                    <div className="Nav-progress__range--background"/>
                    {/* Add other progress elements */}
                </div>
            </div>

        </div>
    );
};

export default memo(NavigationTimeLine);
