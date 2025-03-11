
// ButtonCalendar.tsx

import React from 'react';
import { Button } from 'antd';
import './style.css';
import IconCalendar from "../../../../../../../../components/icons/iconCalendar/IconCalendar";

interface ButtonCalendarProps {
    onClick: () => void;
    selectedDate: Date | null; // Добавляем свойство для выбранной даты
}

const ButtonCalendar: React.FC<ButtonCalendarProps> = ({ onClick, selectedDate }) => {
    const today = new Date(); // Получаем текущую дату


    const formattedDate = selectedDate?.toLocaleDateString('ru-RU') === today.toLocaleDateString('ru-RU')
        ? `Сегодня, ${today.toLocaleDateString('ru-RU')}`
        : selectedDate?.toLocaleDateString('ru-RU');

    return (
        <Button className="button" icon={<IconCalendar />} onClick={onClick}>
            {formattedDate}
        </Button>
    );
};

export default ButtonCalendar;
