import React, { useState } from 'react';
import { Radio } from 'antd';
import '../buttonOnlineArchive/styles/style.css';

const ButtonOnlineArchive: React.FC = () => {
    const [selectedLang, setSelectedLang] = useState<string>('Онлайн'); // Установка начального значения "Онлайн"
    return (
        <Radio.Group value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
            <Radio.Button value="RU" className="RadioGroupButton">
                Онлайн
            </Radio.Button>
            <Radio.Button value="KZ" className="RadioGroupButton">
                Архив
            </Radio.Button>
        </Radio.Group>
    );
};
export default ButtonOnlineArchive;