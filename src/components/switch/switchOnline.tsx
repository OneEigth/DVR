
import React, { useState } from 'react';
import {ConfigProvider, Switch} from 'antd';

interface SwitchMapProps {
    onChange: (checked: boolean) => void;
}

const SwitchOnline: React.FC<SwitchMapProps> = ({ onChange }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (isChecked: boolean) => {
        setChecked(isChecked);
        onChange(isChecked);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4D4E65'
                },
            }}
        >
            <Switch className="SwitchOnline" checked={checked} onChange={handleChange} />
        </ConfigProvider>

)
};

export default SwitchOnline;
