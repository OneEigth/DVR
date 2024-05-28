import { Button } from 'antd';
import React from 'react';
import './styleSettingGroup.css'
import IconSettingsGroup from "../../icons/iconSettigsGroup/IconSettingsGroup";

interface ButtonSettingGroupProps {
    onClick: () => void;
}

const ButtonSettingGroup: React.FC<ButtonSettingGroupProps> = ({ onClick }) => (
    <Button className="ButtonSettingGroup" onClick={onClick} icon={<IconSettingsGroup />}></Button>
);

export default ButtonSettingGroup;