import React, { useState } from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs'; // Import dayjs and Dayjs type

interface CalendarNavProps {
    onSelect: (date: Date) => void;
}

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('DD-MM-YYYY'), mode);
};

const CalendarNav: React.FC<CalendarNavProps> = ({ onSelect }) => {
    const { token } = theme.useToken();
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()); // Initialize with current date

    const handleDateSelect = (value: Dayjs) => {
        const date = value.toDate(); // Convert Dayjs object to Date
        setSelectedDate(value); // Update selected date in state
        onSelect(date); // Call onSelect prop with selected date
    };

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    return (
        <div className="calendarNav" style={wrapperStyle}>
            <Calendar
                fullscreen={false}
                value={selectedDate} // Set the selected date
                onChange={handleDateSelect} // Handle date selection
                onPanelChange={onPanelChange} // Handle panel change
            />
        </div>
    );
};

export default CalendarNav;
