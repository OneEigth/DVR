// SwitchMap.tsx
import React, { useState } from 'react';
import { Switch } from 'antd';

interface SwitchMapProps {
    onChange: (checked: boolean) => void;
}

const SwitchMap: React.FC<SwitchMapProps> = ({ onChange }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleChange = (isChecked: boolean) => {
        setChecked(isChecked);
        onChange(isChecked);
    };

    return <Switch checked={checked} onChange={handleChange} />;
};

export default SwitchMap;
