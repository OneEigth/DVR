// CalendarModal.tsx

import React, { useState } from 'react';
import { Modal } from 'antd';
import CalendarNav from '../calendarNav/CalendarNav';

interface CalendarModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    handleDateSelect: (date: Date) => void; // Add handleDateSelect prop
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isModalOpen, handleOk, handleCancel, handleDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleOkClick = () => {
        if (selectedDate) {
            handleDateSelect(selectedDate); // Call handleDateSelect with selected date
        }
        handleOk();
    };

    const handleCancelClick = () => {
        setSelectedDate(null); // Reset selected date if cancelled
        handleCancel();
    };

    return (
        <div className="calendar_modal">
            <Modal
                title="Календарь"
                visible={isModalOpen}
                onOk={handleOkClick}
                onCancel={handleCancelClick}
            >
                <CalendarNav onSelect={handleDateSelect} />
            </Modal>
        </div>
    );
};

export default CalendarModal;
