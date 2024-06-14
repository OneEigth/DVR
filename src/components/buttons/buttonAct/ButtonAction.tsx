import React from 'react';
import { Button } from 'antd';
import "./style.css"
import IconAction from "../../icons/iconAction/IconAction";

interface ButtonActionProps {
    onClick: () => void;
}
const ButtonAction: React.FC<ButtonActionProps> = ({onClick}) => {
    return (

            <Button className="button" icon={<IconAction/>}  style={{ backgroundColor: '#4D4E65', color: '#FFFFFF' }} onClick={onClick} />

    );
};
export default ButtonAction;