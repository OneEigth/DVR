import {Button, Flex} from 'antd';
import React from 'react';
import './style.css'
import {PlusOutlined} from '@ant-design/icons'

interface ButtonAddPlusProps {
    onClick: () => void;
}

const ButtonAddPlus: React.FC<ButtonAddPlusProps> = ({ onClick }) => (
    <Flex gap="small" wrap="wrap" className="flex">
    <Button className="buttonAddPlus" icon={<PlusOutlined />} onClick={onClick} style={{ backgroundColor: '#4D4E65' , color:  '#FFFFFF' , border: '1px solid #4D4E65', display: 'flex', alignItems: 'center', justifyContent: 'center' }} ></Button>
    </Flex>
);

export default ButtonAddPlus;