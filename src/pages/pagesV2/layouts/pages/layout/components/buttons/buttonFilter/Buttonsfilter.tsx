import React, {useEffect, useState} from 'react';
import { Button, Flex } from 'antd';
import "./style/style.css";
import IconFilterButtonSmall from "../../../../../../../../components/icons/iconFilterButton/iconFilterButtonSmall";
import IconFilterButtonMedium from "../../../../../../../../components/icons/iconFilterButton/iconFilterButtonMedium";
import IconFilterButtonBig from "../../../../../../../../components/icons/iconFilterButton/iconFilterButtonBig";

interface ButtonsfilterProps {
    onFilterButtonClick: (size: 'small' | 'medium' | 'big') => void;
}

const Buttonsfilter: React.FC<ButtonsfilterProps> = ({ onFilterButtonClick }) => {
    const [activeButton, setActiveButton] = useState<'small' | 'medium' | 'big'>('small');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveButton(size);
        onFilterButtonClick(size);
    };

    const isMediumVisible = windowWidth > 850;
    const isBigVisible = windowWidth > 1024;

    return (

        <Flex gap="small" wrap="wrap" className="flex">
            <Button
                className="FilterButtonSmall"
                type="primary"
                icon={<IconFilterButtonSmall active={activeButton === 'small'} />}
                style={{
                    backgroundColor: activeButton === 'small' ? '#4D4E65' : '#FFFFFF',
                    color: activeButton === 'small' ? '#FFFFFF' : '#4D4E65',
                    border: '1px solid #4D4E65',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() => handleButtonClick('small')}
            />
            {isMediumVisible && (
                <Button
                    className="FilterButtonMedium"
                    type="primary"
                    icon={<IconFilterButtonMedium active={activeButton === 'medium'} />}
                    style={{
                        backgroundColor: activeButton === 'medium' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === 'medium' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => handleButtonClick('medium')}
                />
            )}
            {isBigVisible && (
                <Button
                    className="FilterButtonBig"
                    type="primary"
                    icon={<IconFilterButtonBig active={activeButton === 'big'} />}
                    style={{
                        backgroundColor: activeButton === 'big' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === 'big' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => handleButtonClick('big')}
                />
            )}
        </Flex>
    );
};

export default Buttonsfilter;
