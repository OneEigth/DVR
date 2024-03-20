import React, {useState} from 'react';
import type {ConfigProviderProps} from 'antd';
import {Radio} from 'antd';


type SizeType = ConfigProviderProps['componentSize'];

const ButtonLang: React.FC = () => {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    return (
        <>
            <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                <Radio.Button value="RU">

                    RU
                </Radio.Button>
                <Radio.Button value="KZ">

                    KZ
                </Radio.Button>
            </Radio.Group>
        </>
    );
};

export default ButtonLang;