import React from 'react';
import { Button, Flex } from 'antd';
import "./style/style.css"
import IconFilterControlButton from "../../../../../../../../components/icons/iconFilterButton/iconFilterControlButton";

interface ButtonsFilterProps {
    onClick: () => void;
}
const Buttonsfilter: React.FC<ButtonsFilterProps> = ({onClick}) => {
    return (
        <Flex gap="small" wrap="wrap" className="flex">
            <Button type="primary" icon={<IconFilterControlButton  />}  style={{ backgroundColor: '#4D4E65', color: '#FFFFFF' }} onClick={onClick} />
            {/*<Button type="primary" icon={<IconFilterButton />} style={{ backgroundColor: '#FFFFFF', color: '#4D4E65', border: '1px solid #4D4E65' }} />*/}
        </Flex>
    );
};
export default Buttonsfilter;