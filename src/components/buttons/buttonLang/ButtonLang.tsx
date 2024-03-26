import React, {useState} from 'react';
import type {ConfigProviderProps} from 'antd';
import {Radio} from 'antd';
import '../buttonLang/styles/style.css'


type SizeType = ConfigProviderProps['componentSize'];

const ButtonLang: React.FC = () => {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    return (
        <>
            <Radio.Group value={size} onChange={(e) => setSize(e.target.value)} className="RadioGroup">
                <Radio.Button value="RU" className="RadioGroupButton">
                    RU
                </Radio.Button>
                <Radio.Button value="KZ" className="RadioGroupButton">
                    KZ
                </Radio.Button>
            </Radio.Group>
        </>
    );
};

export default ButtonLang;