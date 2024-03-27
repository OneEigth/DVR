import React, { useState } from 'react';


import { Radio } from 'antd';
import '../buttonLang/styles/style.css';

const ButtonLang: React.FC = () => {
    const [selectedLang, setSelectedLang] = useState<string>('RU'); // Установка начального значения "RU"

    return (
        <Radio.Group value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
            <Radio.Button value="RU" className="RadioGroupButton">
                RU
            </Radio.Button>
            <Radio.Button value="KZ" className="RadioGroupButton">
                KZ
            </Radio.Button>
        </Radio.Group>
    );
};

export default ButtonLang;